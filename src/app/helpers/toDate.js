
const  toDate = (data) => {
    if(data!==undefined)
        return data.slice(0,10).replace('T'," ");
    };
const toTime = (data) => {
        return data.slice(10,16).replace('T'," ");
    };
const byDate = (a,b) => {
        return new Date(b.dataSeansu) - new Date(a.dataSeansu);
    };

export { toDate, toTime, byDate};