async function getIpv4() {
    const res = await fetch("https://ident.me");
    const info = await res.text();

    return info;
}
