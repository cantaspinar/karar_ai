const fs = require('fs');


async function getVerdicts() {
    const result = await fetch("https://karararama.yargitay.gov.tr/aramadetaylist", {
        "headers": {
            "accept": "*/*",
            "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json; charset=UTF-8",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "JSESSIONID=F912DD3280A5A477DF608811B61C7897",
            "Referer": "https://karararama.yargitay.gov.tr/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"data\":{\"arananKelime\":\"\",\"yargitayMah\":\"Büyük Genel Kurulu\",\"hukuk\":\"23. Hukuk Dairesi\",\"ceza\":\"23. Ceza Dairesi\",\"esasYil\":\"\",\"esasIlkSiraNo\":\"\",\"esasSonSiraNo\":\"\",\"kararYil\":\"\",\"kararIlkSiraNo\":\"\",\"kararSonSiraNo\":\"\",\"baslangicTarihi\":\"\",\"bitisTarihi\":\"\",\"siralama\":\"3\",\"siralamaDirection\":\"desc\",\"birimYrgKurulDaire\":\"Hukuk Genel Kurulu+Ceza Genel Kurulu+Ceza Daireleri Başkanlar Kurulu+Hukuk Daireleri Başkanlar Kurulu+Büyük Genel Kurulu\",\"birimYrgHukukDaire\":\"1. Hukuk Dairesi+2. Hukuk Dairesi+3. Hukuk Dairesi+4. Hukuk Dairesi+5. Hukuk Dairesi+6. Hukuk Dairesi+7. Hukuk Dairesi+8. Hukuk Dairesi+9. Hukuk Dairesi+10. Hukuk Dairesi+11. Hukuk Dairesi+12. Hukuk Dairesi+13. Hukuk Dairesi+14. Hukuk Dairesi+15. Hukuk Dairesi+16. Hukuk Dairesi+17. Hukuk Dairesi+18. Hukuk Dairesi+19. Hukuk Dairesi+20. Hukuk Dairesi+21. Hukuk Dairesi+22. Hukuk Dairesi+23. Hukuk Dairesi\",\"birimYrgCezaDaire\":\"1. Ceza Dairesi+2. Ceza Dairesi+3. Ceza Dairesi+4. Ceza Dairesi+5. Ceza Dairesi+6. Ceza Dairesi+7. Ceza Dairesi+8. Ceza Dairesi+9. Ceza Dairesi+10. Ceza Dairesi+11. Ceza Dairesi+12. Ceza Dairesi+13. Ceza Dairesi+14. Ceza Dairesi+15. Ceza Dairesi+16. Ceza Dairesi+17. Ceza Dairesi+18. Ceza Dairesi+19. Ceza Dairesi+20. Ceza Dairesi+21. Ceza Dairesi+22. Ceza Dairesi+23. Ceza Dairesi\",\"pageSize\":100,\"pageNumber\":1}}",
        "method": "POST"
    });
    const res = await result.json();
    const data = res["data"]["data"];

    let d = JSON.stringify(data);
    fs.writeFileSync('verdicts.json', d);
}

async function getVerdict(verdictId) {
    const result = await fetch(`https://karararama.yargitay.gov.tr/getDokuman?id=${verdictId}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "JSESSIONID=F912DD3280A5A477DF608811B61C7897",
            "Referer": "https://karararama.yargitay.gov.tr/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    const data = await result.json();
    return data;
}



async function getDetails() {
    let rawdata = fs.readFileSync('verdicts.json');
    let verdicts = JSON.parse(rawdata);

    let finalVerdicts = []
    let i = 0
    for await (const element of verdicts) {
        i++;

        console.log(i)
        await new Promise(r => setTimeout(r, 1500));

   
        let finalElement = { ...element }
        const data = await getVerdict(element.id)
        finalElement["detail"] = data
        finalVerdicts.push(finalElement);

    }

    let d = JSON.stringify(finalVerdicts);
    fs.writeFileSync('finalVerdicts.json', d);

}

getDetails()

// getVerdict(911853900)