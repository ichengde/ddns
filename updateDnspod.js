import { dnspod } from "tencentcloud-sdk-nodejs-dnspod"
import { getIpv6 } from "./getIpv6.js"
import process from 'node:process';
// doc https://console.cloud.tencent.com/api/explorer?Product=dnspod&Version=2021-03-23&Action=ModifyRecord

const ipv6Type = 'AAAA'

export function getDnspodClient() {

    const DnspodClient = dnspod.v20210323.Client;

    const clientConfig = {
        credential: {
            secretId: process.env.dnspodSecretId,
            secretKey: process.env.dnspodSecretKey,
        },
        region: "",
        profile: {
            httpProfile: {
                endpoint: "dnspod.tencentcloudapi.com",
            },
        },
    }

    const client = new DnspodClient(clientConfig);
    return client;
}

export async function getRecordList() {
    const client = getDnspodClient();
    const params = {
        Domain: process.env.dnspodDomain
    };
    const res = await client.DescribeRecordList(params)

    return res;
}

export async function updateDnspod() {
    const client = getDnspodClient();
    const res = await getRecordList()

    const ipv6 = res.RecordList.filter(i => i.Type === ipv6Type)

    const ops = ipv6.map(async i => {
        const modifyParams = {
            Domain: process.env.dnspodDomain,
            SubDomain: i.Name,
            RecordType: ipv6Type,
            RecordLine: "默认",
            Value: await getIpv6(),
            RecordId: i.RecordId,
            Remark: 'ipv6 auto update'
        };
        return await client.ModifyRecord(modifyParams)
    })

    return await Promise.all(ops)
}