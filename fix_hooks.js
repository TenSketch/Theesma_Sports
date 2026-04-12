const fs = require('fs');
const path = require('path');

const hooks = ['useState', 'useEffect', 'useContext', 'useRef', 'useRouter', 'useSession'];
const hookRegex = new RegExp('\\b(' + hooks.join('|') + ')\\b');

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (hookRegex.test(content)) {
                if (!content.trim().startsWith("'use client'") && !content.trim().startsWith('"use client"')) {
                    fs.writeFileSync(fullPath, '"use client";\n' + content);
                    console.log('Fixed:', fullPath);
                }
            }
        }
    }
}

processDir('./app');
processDir('./src');
