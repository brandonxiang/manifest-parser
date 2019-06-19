const parseManifest = require('../dist').default

test('should parse ', async () => {
    const url = 'https://vuepress.vuejs.org/'
    const res = await parseManifest(url)
    expect(res.title).toBe('VuePress')
    expect(res.link).toBe('https://vuepress.vuejs.org/')
    // expect(res.icon).toBe('https://vuepress.vuejs.org/icons/android-chrome-192x192.png')
})
