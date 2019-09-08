const vscode = require('vscode');
const childProcess = require('child_process')

function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.recompileModule', () => recompileModule(context));
	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

function recompileModule(context) {
	const reload_exs = context.asAbsolutePath("remote_reload.exs")
	const editor = vscode.window.activeTextEditor;
	const module = findModuleAtCursor(editor) || findModuleInFile(editor)
	if (module) {
		reload(reload_exs, module)
	}
}

function findModuleAtCursor(editor) {
	let activeLine = editor.document.lineAt(editor.selection.active)
	let match = activeLine.text.match(/defmodule (.*)\s.*/)
	if (!match || match.length !== 2) return null
	return match[1]
}

function findModuleInFile(editor) {
	let match = editor.document.getText().match(/defmodule ([^\s]*)/)
	if (!match || match.length < 2) return null
	return match[1]
}

function reload(reload_exs, module) {
	let configuration = vscode.workspace.getConfiguration('iex')
	let cookie = configuration.remoteNode.cookie
	let host = configuration.remoteNode.host

	if (!cookie) {
		vscode.window.showErrorMessage("Please specify a cookie in settings.")
		return
	}

	if (!host) {
		vscode.window.showErrorMessage("Please specify a node host in settings.")
		return
	}

	let cmd = `VSC_IEX_REMOTE_NODE='${host}'\
						 VSC_IEX_MODULE='${module}' \
						 elixir --sname "vscode-iex" --cookie "${cookie}" -r ${reload_exs}`

	childProcess.exec(cmd, (err, stdout, stderror) => {
		if (err) {
			console.log(stdout)
			console.log(stderror)
			vscode.window.showErrorMessage(`Failed to recompile ${module}`)
		} else {
			vscode.window.showInformationMessage(`Recompiled ${module}`)
		}

});

}

module.exports = {
	activate,
	deactivate
}
