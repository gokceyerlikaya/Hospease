type Bolum = {
    __v: number;
    _id: string;
    bolum_adi: string;
    bolum_id: number;
    hastane_id: number;
};

type Alan = {
    "_id": string,
    "alan_id": number,
    "alan_adi": string,
    "bolum_id": number,
    "__v": number
}

type Hospital = {
    id: string
    hastane_id: number;
    hastane_adi: string;
    hastane_aciklamasi: string;
    sehir_id: number;
};

type Yogunluk = {
    _id: string;
    "yogunluk_degeri": number;
    "alan_id": number;
    "__v": number;
}
