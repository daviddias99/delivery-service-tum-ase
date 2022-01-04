mongoimport --db mongo-ase-db --collection delivery --drop --jsonArray --file ./delivery_seed.json
mongoimport --db mongo-ase-db --collection boxes --drop --jsonArray --file ./box_seed.json
mongoimport --db mongo-ase-user --collection users --drop --jsonArray --file ./user_seed.json