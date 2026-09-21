const fs=require('fs');const sharp=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/sharp');
(async()=>{const [src,dest]=process.argv.slice(2);await sharp(src).resize(640,800,{fit:'cover'}).webp({quality:82}).toFile(dest);console.log(dest)})();
