
export const category = (navigation)=>[
{
    id: 1,
    imageUri: require('@/assets/images/Turbo.png'),
    onPress: ()=>navigation.navigate("FastMarket", {
        title: 'HajdeShpejt', 
        titleDescription: 'Dërgesa brënda 15 minutave. ',  
        bodyTitle: `Ky shërbim do të bëjë të mundur që dërgesa për një gamë produktesh të kryhet brënda 20 minutave.`, 
        image: require('@/assets/images/Turbo.png'), 
    }),
    active: true,
    name: "HajdeShpejt"
},
{
    id: 2,
    imageUri: require('@/assets/images/Restaurant.png'),
    onPress: ()=>navigation.navigate("Restauranet"),
    active: true,
    name: "Restaurant"
},
{
    id: 3,
    imageUri: require('@/assets/images/SuperMarket.png'),
    onPress: ()=>navigation.navigate("Marketet"),
    active: true,
    name: "Supermarket"
},
{
    id: 4,
    imageUri: require('@/assets/images/Drink.png'),
    onPress: ()=>navigation.navigate("NoContent", {
        title: 'HajdeFestë', 
        titleDescription: 'Produktet më të përzgjedhura',  
        bodyTitle: `Ky shërbim do të ofrojë pijet alkolike më të njohura lokalisht nga shitësit më prestigjozë.`, 
        image: require('@/assets/images/Drink.png'), 
    }),
    active: false,
    name: "HajdeFestë"
}
];


export const category2 = (navigation)=>[
{
    id: 5,
    imageUri: require('@/assets/images/IconSetLunchPack.png'),
    onPress: ()=>navigation.navigate("NoContent", {
        title: 'Lunch Pack', 
        titleDescription: '& dhurata ',  
        bodyTitle: ``, 
        image: require('@/assets/images/IconSetLunchPack.png'), 
    }),
    active: false,
    name: "Lunch Pack"
},
{
    id: 6,
    imageUri: require('@/assets/images/Farmacy.png'),
    onPress: ()=>navigation.navigate("NoContent", {
        title: 'Farmaci', 
        titleDescription: 'Produkte për shëndetin dhe stilin e jetesës.', 
        bodyTitle: `Ky shërbim do të ofrojë një game produktesh si suplementë ushqimorë, produkte kozmetike të cilat janë zyrtare dhe të verifikuara.`, 
        image: require('@/assets/images/Farmacy.png'), 
    }),
    active: false,
    name: "Farmaci"
},
{
    id: 7,
    imageUri: require('@/assets/images/PetCare.png'),
    onPress: ()=>navigation.navigate("NoContent", {
        title: 'Pet Care',
        titleDescription: 'Shumëllojshmëri produktesh për kafshët',  
        bodyTitle: 'Ky shërbim do të ofrojë marketing ideal për produktet ushqyese, të higjenës dhe kujdesit për kafshët.', 
        image: require('@/assets/images/PetCare.png'), 
    }),
    active: false,
    name: "Pet care"
},
{
    id: 8,
    imageUri: require('@/assets/images/Fitness.png'),
    onPress: ()=>navigation.navigate("NoContent", {
        title: 'Fitness & Gym', 
        titleDescription: 'Bodybuilding & Organism', 
        bodyTitle: `Ky shërbim do të ofrojë markat më cilësore të suplementeve për palestër`,
        image: require('@/assets/images/Fitness.png'), 
    }),
    active: false,
    name: "Fitness"
}
];