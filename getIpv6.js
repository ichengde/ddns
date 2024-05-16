import { spawn } from 'node:child_process'

export async function getIpv6() {
    return new Promise((resolve, reject) => {
        let ipv6 = ''
        const child = spawn("powershell.exe", [`(Get-NetIPAddress -AddressFamily "ipv6" -SuffixOrigin "link" -PrefixOrigin "RouterAdvertisement").IPAddress`]);
        child.stdout.on("data", (data) => {
            ipv6 = data
        });
        child.stderr.on("data", (data) => {
            // console.log(`Powershell Errors: ${data}`);
        });
        child.on("exit", () => {
            resolve(ipv6.toString().trim())
        });

        child.stdin.end(); //end input

        return ipv6
    })
}
