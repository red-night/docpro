const dirTree = require('directory-tree');
const path = require('path');


function getNav() {
    let projets = dirTree(path.join(__dirname, '../'), { extensions: /\.md/ });
    let nav = [];
    nav.push({
        text: 'Home',
        link: '/'
    })
    for (let index = 0; index < projets.children.length; index++) {
        let element = projets.children[index]
        let item = generateNavItem(element, '/' + element.name + '/')
        if (item !== null) {
            nav.push(item);
        }
    }
    return nav;
}

function generateNavItem(folder, path) {
    if (folder === undefined ||
        folder.children === undefined ||
        folder.children.length <= 0 ||
        folder.name === '.vuepress' ||
        folder.type !== 'directory') {
        return null
    }

    if (folder.children.length === 1 && folder.children[0].name === 'README.md') {
        return {
            text: folder.name,
            link: path
        }
    }
    let items = []
    for (let index = 0; index < folder.children.length; index++) {
        let element = folder.children[index];
        if (element.type === 'file' && element.extension === '.md' && element.name !== 'README.md') {
            items.push({
                text: element.name.replace('.md', ''),
                link: path + element.name
            })
        } else if (element.type === 'directory') {
            let subItem = generateNavItem(element, path + element.name + '/')
            if (subItem !== null) {
                items.push(subItem)
            }
        }
    }
    return {
        text: folder.name,
        items: items
    }
}

module.exports = {
    title: 'iPROS Doc Site',
    description: 'This is a document site for iPROS, the content includes User Manuals, Installation Guide and Domain Knowledge and so on.',
    themeConfig: {
        nav: getNav(),
        lastUpdated: 'Last Updated',
        displayAllHeaders: true,
    }
}

