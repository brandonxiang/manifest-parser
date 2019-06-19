import fetch from 'node-fetch'

interface Icon {
    src: string
    sizes: string
    type: string
}

interface Manifest {
    name: string
    icons: Icon[]
}

interface Output {
    title: string
    link: string
    icon: string
}


async function getManifest (url: string) {
    const res = await fetch(url)
    const body = await res.text()
    const re = /<link\s+rel=[\"']manifest[\"'].*?href=[\"']([\S\s]*?)[\"'].*?[\/]?>/i
    const result = body.match(re)
    if(result && result[1]) {
        return result[1]
    }
    return ''
}



async function readManifest (url: string, path: string) {
    const manifestUrl = `${url}${path}`
    const res = await fetch(manifestUrl)
    const bodyStr = await res.text()
    const body: Manifest = JSON.parse(bodyStr)

    const manifestJson: Output = {
        title: body.name,
        link: url,
        icon: ''
    }

    if(body.icons && body.icons.length) {
        manifestJson.icon = `${url}${body.icons[0].src}`
    }
    return manifestJson

} 

export default async function parseManifest(url: string) {
    const path = await getManifest(url)
    const output = await readManifest(url, path)
    return output
}
