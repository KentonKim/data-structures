const server = {
    people: [
      {
        name: "Odin",
        age: 20,
      },
      {
        name: "Thor",
        age: 35,
      },
      {
        name: "Freyja",
        age: 29,
      },
    ],
  
    getPeople() {
        return new Promise((resolve, reject) => {
            // Simulating a delayed network call to the server
            setTimeout(() => {
            resolve(this.people);
            }, 2000);
        });
    },
};

// async function getPersonsInfo(name) {
//     const people = await server.getPeople();
//     const person = people.find(person => { return person.name === name });
//     return person;
// }

function getPersonsInfo(name) {
    return server.getPeople().then(people => {
        return people.find(person => { return person.name === name });
    });
}

console.log(getPersonsInfo('Odin'))