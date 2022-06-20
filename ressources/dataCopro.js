export const dataCopro= {
    infos:[{date:"02/02/2222",message:"Blabla"},{date:"03/02/2222",message:"Blablaefzefz"}],
    finances:{
        solde:1500,
        actuel:300,
        relevé:[
           { janvier:{
                debut:1130,
                fin:650,
                details:[{date:"02/01/2022",description:"EDF",type:"VIR",montant:'19.28'}]
            }},
            {février:{
                début:650,
                fin:300,
                details:[{date:"02/02/2022",description:"EDF",type:"PRLV",montant:'82'}]

            }}
        ]
    },
    incident:[],
    proprio:['George Truc',"Michel Durand","Koch Christopher"]
}