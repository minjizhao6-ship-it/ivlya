$ErrorActionPreference = "Stop"

Set-Location -LiteralPath "E:\ivlya\deploy-repo"

$sshCommand = "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL -o IdentitiesOnly=yes -i C:/Users/Administrator/.ssh/id_ed25519 -o ProxyCommand='E:/Program Files/Git/mingw64/bin/connect.exe -S 127.0.0.1:10808 %h %p'"

git -c core.sshCommand="$sshCommand" push -u git@ssh.github.com:minjizhao6-ship-it/ivlya.git main

