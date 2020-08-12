const options1 = ["Natural", 'Cotton','Silk','Linen',"Jute",'Hemp',"Bamboo","Lyocell","Viscose","All Natural"]
const options2 = ["Animal",'Wool', "Cashmere", "All Animal"]
const options3 = ["Synthetic",'Polyester', 'PE/PET', 'Nylon', 'All Synthetic']
const options4 = ["Recycled",'All Recycled']
const options5 = ["Deadstock",'All Deadstock']
export const options = [options1, options2, options3, options4, options5]

export const types = ['Jersey/Knit', 'Silk/Satin','Tweed','Velvet','Cotton','Corduroy','Denim','Faux Leather/Suede','Linen','Wool Woven','Athletic Material','Swimsuit Material', 'All Fabric Types']
export const minimums = ['< 100 yards', '200 - 400', '400 - 700', '700 - 1000', '1000+', "All Minimun Req."]
export const prices = ['< $5', '$5 - $10', "$10 - $30", "$30 - $50", "$50+", "All Prices"]
export const weights = ['< 50 gsm', "50 - 100 gsm", "100 - 200 gsm", "200 - 300 gsm", '300 - 400 gsm', "400 - 500 gsm", "500+ gsm", "All Weights"]
export const manuInfo = [{
    name: 'ABC Manufacturing',
    production: 'Cotton, twill',
    saved: false,
    location: 'Los Angeles, CA',
    Minimum: '100 yards', 
    price: '$10 - $15 per yard',
    Brands: 'ABCeco, Boutique, madeconscious',
    email: 'abcmanufacturing@gmail.com',
    tel:'(692)716-7452',
    contactName: 'Sally Smith',
}, {
    name: 'ABC Manufacturing',
    saved: false,
    location: 'Los Angeles, CA',
    Minimum: '100 yards', 
    price: '$10 - $15 per yard',
    Brands: 'ABCeco, Boutique, madeconscious',
    email: 'abcmanufacturing@gmail.com',
    tel:'(692)716-7452',
    contactName: 'Sally Smith',
}, {
    name: 'ABC Manufacturing',
    saved: false,
    location: 'Los Angeles, CA',
    Minimum: '100 yards', 
    price: '$10 - $15 per yard',
    Brands: 'ABCeco, Boutique, madeconscious',
    email: 'abcmanufacturing@gmail.com',
    tel:'(692)716-7452',
    contactName: 'Sally Smith',
}, {
    name: 'ABC Manufacturing',
    saved: false,
    location: 'Los Angeles, CA',
    Minimum: '100 yards', 
    price: '$10 - $15 per yard',
    Brands: 'ABCeco, Boutique, madeconscious',
    email: 'abcmanufacturing@gmail.com',
    tel:'(692)716-7452',
    contactName: 'Sally Smith',
}]

//shop page constants
export const shopFabrics = [
    ['Plant based','Organic cotton','Linen','Hemp', 'Ramie'],
    ['Animal based','Alpaca','Silk','Ethical leather/vegan leather','Ethical wool','Ethical cashmere'],
    ['Semi-synthetic','Bamboo','Lyocell/viscose/tencel','Pineapple fibres','Rayon','Biodegradable nylon','Refibra'], 
    ['Recycled','Recycled polyester','Recycled nylon','Recycled cotton','Recycled wool'], ['Denim','Denim']
]
export const color = ['Black','White','Brown',"Red",'Orange','Yellow','Green','Blue',"Purple",'Pink']
export const print = ['Polka dot','Stripes','Floral','Animal','Abstract','Paisley','Checkered','Plaid','Customisable','Miscellaneous/other']
export const location = [
    ['North America','Cananda','North East US','Southwest US','Southeast US','Midwest US','West coast US'],
    ['South America','South America'],
    ['Africa','Africa'],
    ['Australia','Australia '],
    ['Asia','South Asia','South east Asia','East Asia'],
    ['Europe','Europe']
]
export const shop_prices = ['~ $5 per yard', '$5 - $10 per yard', "$10 - $30 per yard", "$30+"]
export const shop_weights = ['Lightweight ~6 oz','Medium weight 6-8 oz','Heavy weight 8+ oz']
export const detailing = ['Velvet','Mesh','Satin','Sequins/glitter','Metallic','Canvas','Lace']

export const shopSectors = [
    {
        id:'1',
        name:'Burgundy Leather',
        price: 10,
        tags:['leather']
    }, {
        id:'2',
        name:'Peach Silk',
        price:10,
        tags:['silk']
    }, {
        id:'3',
        name:'Mid-wash Denim',
        price:10,
        tags:['denim']
    }, {
        id:'4',
        name:'Green Silk',
        price:10,
        tags:['silk']
    },{
        id:'5',
        name:'Baby Pink Knit',
        price:10,
        tags:['knit']
    }, {
        id:'6',
        name:'Ocean Blue Leather',
        price:10,
        tags:['leather']
    }, {
        id:'7',
        name:'White Lace',
        price:10,
        tags:['lace']
    }, {
        id:'8',
        name:'Caramel Silk',
        price:10,
        tags:['silk']
    }, {
        id:'9',
        name:'Turtle Print',
        price:10,
        tags:['print']
    }
]
//quiz page constants
export const designs = ['Swimwear','Denim jackets, Pants, Tops','Summer dresses, Tops, Skirts','Trousers, Slacks, Bottoms','Leather/Suede',
'Knitwear','Shirts & Blouses','Activewear','Blazers & Coats','Hoodies','Smart casual & Formal dresswear','Other']
export const bodies = ['Body fit: stretches to hug body','Loose, comfy, easy fit','Fabric holds its fit but is comfy on body',
'Oversized, baggy','Structured, sharp','Drapes over body']
export const fits = ['Lightweight, barely there feel (thin chiffons, loose airy summer dresses)','Medium, normal weight (basic cotton shirts, trousers)',
'Heavy weight (thick hoodies, thick jeans, coats)','Flexible on weight']
export const detailings = ['Lace','Metallic, shiny','Glitter, sequins','Patterns','Customizable patterns','Mesh','Embroidered','Velvet','Silk, satin','None of the above']
export const sheernesses = ['See through, sheer', 'Partially sheer','Opaque','No preference']