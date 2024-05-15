const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// 从命令行参数获取信息
const args = process.argv.slice(2);
const numberOfWallets = parseInt(args[0]) || 1; // 默认生成一个钱包
const saveToFile = args.includes('--save');

function generateWallets(number) {
    let wallets = [];
    for (let i = 0; i < number; i++) {
        const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);
        wallets.push({
            address: wallet.address,
            mnemonic: mnemonic,
            privateKey: wallet.privateKey,
        });
    }
    return wallets;
}

function saveWalletsToFile(wallets) {
    const filePath = path.join(__dirname, 'wallets.txt');
    let fileContent = '';
    wallets.forEach(wallet => {
        fileContent += `Address: ${wallet.address}\nMnemonic: ${wallet.mnemonic}\nPrivate Key: ${wallet.privateKey}\n\n`;
    });
    fs.writeFileSync(filePath, fileContent);
    console.log(`Wallets have been saved to ${filePath}`);
}

function main() {
    const wallets = generateWallets(numberOfWallets);
    wallets.forEach((wallet, index) => {
        console.log(`Wallet ${index + 1}:`);
        console.log('Address:', wallet.address);
        console.log('Mnemonic:', wallet.mnemonic);
        console.log('Private Key:', wallet.privateKey);
        console.log('----------------------------------');
    });

    if (saveToFile) {
        saveWalletsToFile(wallets);
    }
}

main();

module.exports = { generateWallets, saveWalletsToFile };
