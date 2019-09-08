# IEx README

Have you ever made changes to an Elixir module and bounced to IEx to run `r(Foo.Bar)`? Now you can do it from inside your editor! This extension currently provides a single command, `IEx: Recompile Module`, that sends an RPC call to your IEx session to recompile a module.

You can run this command by right-clicking on a module and selecting the command, or from the command palette. If no module name is under your cursor, the extension will simply find the first module defined in the currently active editor and recompile that.

## Requirements

For this extension to work, it needs to know where to find your IEx session. You will need to specify an `sname` and `cookie` when you start IEx. 

```
iex --sname my-app --cookie my-secret -S mix run
```

These values must be provided in turn to the extension in your user settings.

It is assumed `iex` is available in your `PATH`.

## Extension Settings

This extension contributes the following required settings:

 * `iex.remoteNode.host`: The name of your IEx node, ex. `my-app@1Q84`
 * `iex.remoteNode.cookie`: Your secret cookie, ex. `my-secret`

## Known Issues

None known, undoubtedly several unknown.

## Release Notes

### 1.0.0

Initial release. Errors likely.
