import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  allProds = new BehaviorSubject(undefined);
  foundProds=new BehaviorSubject(undefined);
  constructor(private http: HttpClient) {
    this.getProducts().then().catch();
  }
  getProducts() {
    // this.allProds.next(dummy_prods.slice(0,6))
    return new Promise((resolve,reject)=>{
      this.http.get(environment.baseurl+'/products/role/agent').toPromise().then((resp:any)=>{
        console.log('All prods next: ',resp);
        
        this.allProds.next(resp);
        // resolve(resp);
      })
    })
  }
  async getProdById(prodId: number) {
    let prods = this.allProds.value;
    // debugger;
    if (prods.length > 0) {
      
      return prods.filter(prod=>prod.id==prodId)[0]
    }
    else {
      this.getProducts().then((resp:any)=>{
        return resp.filter(prod=>prod.id===prodId)[0]
      });
    }
  }
  getRelatedProds(prodId:number){
    let related=this.allProds.value;
    return of (related.slice(0,6));
  }
  searchProduct(name){
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        let plist=this.allProds.value;
        return resolve( plist.filter(pro=>pro.name===name));
      }, 1500);
    })
  }
  setFoundProds(prods){
    return new Promise((resolve,reject)=>{
      this.foundProds.next(prods);
      setTimeout(() => {
        resolve(true);
      }, 500);
    })
  }
  getStoreProds(storeName){
    return this.http.get(environment.baseurl+`/products/store/${storeName}`)
  }
}

let dummy_prods = [
  {
    name: 'Geforce Gtx',
    price: 23,
    reduced: 89,
    user: 'Connelly LLC',
    short_description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
    long_description:
      'Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.',
    category: 'Fire Sprinkler System',
    minimum_quantity: 13,
    sky: '30-972-1166',
    image: 'https://i.imgur.com/Fx6n9pm.jpg',
    id: 1,
  },
  {
    name: 'Mineral Oil',
    price: 72,
    reduced: 50,
    user: 'VonRueden Inc',
    short_description: 'Integer a nibh. In quis justo.',
    long_description:
      'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    category: 'Elevator',
    minimum_quantity: 23,
    sky: '53-016-5639',
    image: 'https://i.imgur.com/ZLwWCRK.jpg',
    id: 2,
  },
  {
    name: 'Octinoxate and Oxybenzone',
    price: 51,
    reduced: 69,
    user: 'Torphy and Sons',
    short_description:
      'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    long_description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.',
    category: 'HVAC',
    minimum_quantity: 14,
    sky: '03-454-4357',
    image: 'https://i.imgur.com/DNkEthd.jpg',
    id: 3,
  },
  {
    name: 'Sulfamethoxazole and Trimethoprim',
    price: 89,
    reduced: 98,
    user: 'Littel, Gorczany and Stamm',
    short_description:
      'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    long_description:
      'Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.',
    category: 'Glass & Glazing',
    minimum_quantity: 20,
    sky: '49-250-9110',
    image: 'https://i.imgur.com/DNkEthd.jpg',
    id: 4,
  },
  {
    name: 'Mometasone Furoate',
    price: 67,
    reduced: 52,
    user: 'Rowe-Robel',
    short_description:
      'Proin interdum mauris non ligula pellentesque ultrices.',
    long_description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    category: 'Overhead Doors',
    minimum_quantity: 23,
    sky: '20-719-4130',
    image: 'https://i.imgur.com/D3xvaVL.jpg',
    id: 6,
  },
  {
    name: 'Mometasone Furoate',
    price: 95,
    reduced: 87,
    user: "D'Amore, Rosenbaum and Langosh",
    short_description:
      'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
    long_description:
      'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    category: 'Glass & Glazing',
    minimum_quantity: 8,
    sky: '28-704-2787',
    image: 'https://i.imgur.com/n17LiWS.jpg',
    id: 7,
  },
  {
    name: 'Avobenzone, Homosalate, Octisalate, Octocrylene, and Oxybenzone',
    price: 34,
    reduced: 79,
    user: 'Rath Inc',
    short_description: 'Nulla nisl. Nunc nisl.',
    long_description:
      'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    category: 'Retaining Wall and Brick Pavers',
    minimum_quantity: 25,
    sky: '82-953-3282',
    image: 'https://i.imgur.com/ZLwWCRK.jpg',
    id: 8,
  },
  {
    name: 'bacitracin, neomycin, polymyxin B',
    price: 76,
    reduced: 95,
    user: 'Bradtke-Ratke',
    short_description:
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.',
    long_description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    category: 'Landscaping & Irrigation',
    minimum_quantity: 23,
    sky: '04-914-2834',
    image: 'https://i.imgur.com/D3xvaVL.jpg',
    id: 9,
  },
  {
    name: 'Senna and Docusate Sodium',
    price: 59,
    reduced: 89,
    user: 'Fadel-Abernathy',
    short_description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.',
    long_description:
      'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.',
    category: 'Temp Fencing, Decorative Fencing and Gates',
    minimum_quantity: 17,
    sky: '73-522-9343',
    image: 'https://i.imgur.com/ncfhHSH.jpg',
    id: 10,
  },
  {
    name: 'GLYCERIN',
    price: 75,
    reduced: 82,
    user: 'Towne, Bednar and Prosacco',
    short_description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    long_description:
      'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    category: 'Drywall & Acoustical (FED)',
    minimum_quantity: 15,
    sky: '92-549-2686',
    image: 'https://i.imgur.com/n17LiWS.jpg',
    id: 11,
  },
  {
    name: 'Acetaminophen, Diphenhydramine HCl',
    price: 92,
    reduced: 40,
    user: 'Witting LLC',
    short_description: 'Quisque ut erat. Curabitur gravida nisi at nibh.',
    long_description:
      'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.',
    category: 'Waterproofing & Caulking',
    minimum_quantity: 23,
    sky: '72-280-4631',
    image: 'https://i.imgur.com/PTbVLN6.jpg',
    id: 12,
  },
  {
    name: 'Robitussin',
    price: 38,
    reduced: 95,
    user: 'Metz and Sons',
    short_description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',
    long_description:
      'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    category: 'Sitework & Site Utilities',
    minimum_quantity: 25,
    sky: '85-975-9363',
    image: 'https://i.imgur.com/ncfhHSH.jpg',
    id: 13,
  },
  {
    name: 'Sucralfate',
    price: 44,
    reduced: 92,
    user: 'Dickens Inc',
    short_description: 'Nullam varius. Nulla facilisi.',
    long_description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    category: 'Glass & Glazing',
    minimum_quantity: 22,
    sky: '69-645-7064',
    image: 'https://i.imgur.com/PTbVLN6.jpg',
    id: 14,
  },
  {
    name: 'Aluminum Zirconium Tetrachlorohydrex GLY',
    price: 16,
    reduced: 16,
    user: 'Altenwerth, Dietrich and Luettgen',
    short_description: 'Curabitur convallis.',
    long_description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    category: 'Termite Control',
    minimum_quantity: 24,
    sky: '53-745-0399',
    image: '',
    id: 15,
  },
  {
    name: 'Telmisartan',
    price: 91,
    reduced: 94,
    user: 'Rutherford, Kub and Morissette',
    short_description: 'Integer ac neque.',
    long_description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    category: 'Wall Protection',
    minimum_quantity: 8,
    sky: '33-428-7134',
    image: "https://i.imgur.com/p9a0b1D.jpeg'",
    id: 16,
  },
  {
    name: 'Pyrithione Zinc',
    price: 82,
    reduced: 15,
    user: 'Boehm-Casper',
    short_description: 'Etiam justo.',
    long_description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.',
    category: 'Electrical and Fire Alarm',
    minimum_quantity: 14,
    sky: '23-881-7637',
    image: 'https://i.imgur.com/FiRf4VR.jpg',
    id: 17,
  },
  {
    name: 'Erythropoietin',
    price: 10,
    reduced: 20,
    user: 'Marks, Stamm and Corkery',
    short_description: 'Proin risus. Praesent lectus.',
    long_description:
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    category: 'RF Shielding',
    minimum_quantity: 5,
    sky: '94-577-5025',
    image: 'https://i.imgur.com/FiRf4VR.jpg',
    id: 18,
  },
  {
    name: 'VENLAFAXINE HYDROCHLORIDE',
    price: 23,
    reduced: 53,
    user: 'Torphy Inc',
    short_description: 'In congue.',
    long_description:
      'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.',
    category: 'Drywall & Acoustical (FED)',
    minimum_quantity: 16,
    sky: '92-968-4497',
    image: 'https://i.imgur.com/nP7Gp7o.jpg',
    id: 19,
  },
  {
    name: 'dolasetron mesylate',
    price: 81,
    reduced: 14,
    user: 'Gibson-Weissnat',
    short_description: 'Curabitur convallis.',
    long_description:
      'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.',
    category: 'Asphalt Paving',
    minimum_quantity: 12,
    sky: '58-334-1745',
    image: 'https://i.imgur.com/ncfhHSH.jpg',
    id: 20,
  },
  {
    name: 'Carboplatin',
    price: 89,
    reduced: 77,
    user: 'Kuhic LLC',
    short_description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
    long_description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.',
    category: 'Hard Tile & Stone',
    minimum_quantity: 15,
    sky: '23-590-1516',
    image: '',
    id: 21,
  },
  {
    name: 'Acetaminophen and Diphenhydramine HCl',
    price: 28,
    reduced: 52,
    user: 'Schimmel Inc',
    short_description:
      'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    long_description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.',
    category: 'Framing (Wood)',
    minimum_quantity: 10,
    sky: '18-279-1984',
    image: 'https://i.imgur.com/5dRuC3a.jpg',
    id: 22,
  },
  {
    name: 'Magesium Citrate',
    price: 93,
    reduced: 18,
    user: 'Witting and Sons',
    short_description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.',
    long_description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.',
    category: 'Roofing (Asphalt)',
    minimum_quantity: 16,
    sky: '49-202-3109',
    image: 'https://i.imgur.com/PTbVLN6.jpg',
    id: 23,
  },
  {
    name: 'fomepizole',
    price: 61,
    reduced: 31,
    user: 'Tremblay LLC',
    short_description: 'Nulla tellus. In sagittis dui vel nisl.',
    long_description:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    category: 'Retaining Wall and Brick Pavers',
    minimum_quantity: 22,
    sky: '39-398-2353',
    image: 'https://i.imgur.com/FiRf4VR.jpg',
    id: 24,
  },
  {
    name: 'Psyllium husk',
    price: 69,
    reduced: 65,
    user: 'Kiehn LLC',
    short_description: 'Morbi non quam nec dui luctus rutrum.',
    long_description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.',
    category: 'Rebar & Wire Mesh Install',
    minimum_quantity: 7,
    sky: '03-163-7980',
    image: 'https://i.imgur.com/r3A7v0V.jpg',
    id: 25,
  },
  {
    name: 'Hydroxyzine Hydrochloride',
    price: 63,
    reduced: 83,
    user: 'Stanton-Considine',
    short_description:
      'Proin interdum mauris non ligula pellentesque ultrices.',
    long_description:
      'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    category: 'Framing (Wood)',
    minimum_quantity: 25,
    sky: '83-342-2973',
    image: 'https://i.imgur.com/wb1OM0Z.jpg',
    id: 26,
  },
  {
    name: 'providone iodine',
    price: 96,
    reduced: 19,
    user: 'Pollich Inc',
    short_description: 'Duis bibendum. Morbi non quam nec dui luctus rutrum.',
    long_description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.',
    category: 'Drilled Shafts',
    minimum_quantity: 6,
    sky: '76-927-7707',
    image: 'https://i.imgur.com/ZLwWCRK.jpg',
    id: 27,
  },
  {
    name: 'NOREPINEPHRINE BITARTRATE',
    price: 71,
    reduced: 74,
    user: 'Maggio LLC',
    short_description: 'Praesent id massa id nisl venenatis lacinia.',
    long_description:
      'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    category: 'Rebar & Wire Mesh Install',
    minimum_quantity: 13,
    sky: '12-181-5116',
    image: 'https://i.imgur.com/ncfhHSH.jpg',
    id: 28,
  },
  {
    name: 'TRICLOSAN',
    price: 87,
    reduced: 13,
    user: 'Kessler, Fadel and Feil',
    short_description: 'Integer ac leo.',
    long_description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    category: 'Temp Fencing, Decorative Fencing and Gates',
    minimum_quantity: 10,
    sky: '66-343-0944',
    image: 'https://i.imgur.com/DNkEthd.jpg',
    id: 29,
  },
  {
    name: 'Triclosan',
    price: 11,
    reduced: 34,
    user: 'Cronin-Schinner',
    short_description:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    long_description:
      'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
    category: 'RF Shielding',
    minimum_quantity: 5,
    sky: '05-219-1019',
    image: 'https://i.imgur.com/xFE5EfU.jpg',
    id: 30,
  },
  {
    name: 'ALCOHOL',
    price: 62,
    reduced: 70,
    user: 'Kub, Welch and Schultz',
    short_description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    long_description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    category: 'Roofing (Asphalt)',
    minimum_quantity: 12,
    sky: '04-385-1488',
    image: 'https://i.imgur.com/r3A7v0V.jpg',
    id: 31,
  },
  {
    name: 'barium sulfate',
    price: 69,
    reduced: 98,
    user: 'Schmitt Group',
    short_description: 'Morbi porttitor lorem id ligula.',
    long_description:
      'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.',
    category: 'Termite Control',
    minimum_quantity: 13,
    sky: '49-009-9931',
    image: 'https://i.imgur.com/n17LiWS.jpg',
    id: 32,
  },
  {
    name: 'Naloxone Hydrochloride',
    price: 84,
    reduced: 94,
    user: 'Bailey Inc',
    short_description: 'In hac habitasse platea dictumst.',
    long_description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    category: 'Electrical and Fire Alarm',
    minimum_quantity: 17,
    sky: '14-005-9240',
    image: 'https://i.imgur.com/wb1OM0Z.jpg',
    id: 33,
  },
  {
    name: 'deferasirox',
    price: 99,
    reduced: 46,
    user: 'Denesik Group',
    short_description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
    long_description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    category: 'Site Furnishings',
    minimum_quantity: 13,
    sky: '52-292-0702',
    image: 'https://i.imgur.com/FiRf4VR.jpg',
    id: 34,
  },
  {
    name: 'Valsartan and hydrochlorothiazide',
    price: 65,
    reduced: 45,
    user: 'Harvey Group',
    short_description: 'Praesent blandit.',
    long_description:
      'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    category: 'Plumbing & Medical Gas',
    minimum_quantity: 14,
    sky: '78-843-4596',
    image: 'https://i.imgur.com/5dRuC3a.jpg',
    id: 35,
  },
  {
    name: '.Alpha.-Tocopherol Acetate, DL-, Ascorbic Acid, Cholecalciferol, Cyanocobalamin, Folic Acid, Ferrous fumarate, Calcium Phosphate, Dibasic, Anhydrous, Niacinamide, Pyridoxine Hydrochloride, Riboflavin, Thiamine Mononitrate, and Vitamin A Acetate',
    price: 82,
    reduced: 99,
    user: 'Runolfsdottir, Murphy and Barrows',
    short_description: 'Curabitur at ipsum ac tellus semper interdum.',
    long_description:
      'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.',
    category: 'Fire Protection',
    minimum_quantity: 20,
    sky: '42-244-9998',
    image: 'https://i.imgur.com/ZLwWCRK.jpg',
    id: 36,
  },
  {
    name: 'Bacitracin Zinc and Polymyxin B Sulfate',
    price: 83,
    reduced: 100,
    user: 'Altenwerth and Sons',
    short_description:
      'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    long_description:
      'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.',
    category: 'Rebar & Wire Mesh Install',
    minimum_quantity: 14,
    sky: '96-088-6436',
    image: 'https://i.imgur.com/wb1OM0Z.jpg',
    id: 37,
  },
  {
    name: 'Caffeine',
    price: 47,
    reduced: 80,
    user: 'Mayer-Kub',
    short_description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',
    long_description:
      'Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.',
    category: 'Electrical and Fire Alarm',
    minimum_quantity: 10,
    sky: '73-766-6187',
    image: 'https://i.imgur.com/Fx6n9pm.jpg',
    id: 38,
  },
  {
    name: 'Isopropyl Alcohol',
    price: 80,
    reduced: 79,
    user: 'Marvin, Schneider and Denesik',
    short_description: 'Praesent blandit lacinia erat.',
    long_description:
      'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.',
    category: 'Glass & Glazing',
    minimum_quantity: 24,
    sky: '48-258-0615',
    image: 'https://i.imgur.com/FiRf4VR.jpg',
    id: 39,
  },
  {
    name: 'GLYCERIN',
    price: 26,
    reduced: 75,
    user: 'Predovic LLC',
    short_description: 'Aliquam erat volutpat.',
    long_description:
      'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
    category: 'Temp Fencing, Decorative Fencing and Gates',
    minimum_quantity: 22,
    sky: '90-590-3672',
    image: "https://i.imgur.com/p9a0b1D.jpeg'",
    id: 40,
  },
];
/* 
let randImgs=[
https://i.imgur.com/p9a0b1D.jpeg',
https://i.imgur.com/D3xvaVL.jpg,
https://i.imgur.com/n17LiWS.jpg,
https://i.imgur.com/PTbVLN6.jpg,
https://i.imgur.com/ncfhHSH.jpg,
https://i.imgur.com/5dRuC3a.jpg,
https://i.imgur.com/nP7Gp7o.jpg,
https://i.imgur.com/r3A7v0V.jpg,
https://i.imgur.com/GvuMJ4w.jpg,
https://i.imgur.com/ZLwWCRK.jpg,
https://i.imgur.com/Un8ZqsH.jpg,
https://i.imgur.com/Fx6n9pm.jpg,
https://i.imgur.com/DNkEthd.jpg,
https://i.imgur.com/xFE5EfU.jpg,
https://i.imgur.com/wb1OM0Z.jpg,
https://i.imgur.com/FiRf4VR.jpg,
https://i.imgur.com/aybxovW.jpg,
]

*/
