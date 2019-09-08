node = System.get_env("VSC_IEX_REMOTE_NODE") |> String.to_atom()
module_name = System.get_env("VSC_IEX_MODULE")
module = ("Elixir." <> module_name) |> String.to_atom()

:rpc.call(node, IEx.Helpers, :r, [module])
|> case do
  {:reloaded, ^module, [^module]} ->
    System.halt(0)

  error ->
    IO.inspect(error, label: "RPC Error")
    System.halt(1)
end
