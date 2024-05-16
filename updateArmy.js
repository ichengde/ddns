import { getIpv6 } from "./getIpv6.js";
import process from 'node:process';

export const token = process.env.armyToken
export const zone = process.env.armyZone

export async function updateDDns() {
    // const ipv4Url = `https://dynv6.com/api/update?zone=${encodeURIComponent(zone)}&ipv4=${encodeURIComponent('112.74.44.121')}&token=${token}`
    const url = `https://dynv6.com/api/update?zone=${encodeURIComponent(zone)}&ipv6=${encodeURIComponent(await getIpv6())}&token=${token}`;

    // const ipv4Res = await fetch(ipv4Url);
    // const ipv4Info = await ipv4Res.text();
    const res = await fetch(url);
    const info = await res.text();
    return info;
}
