import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Layout from 'components/common/Layout/Layout';
import BoxesList from 'components/boxes/BoxesList/BoxesList';

import api from 'services/api';

// TODO: delete
const boxesStub = [

  { id: 'bfZPwGdetxUlGgpb', name: 'Allen Blair', address: { addressLine1: '1752 Onhop Pike', addressLine2: '7', city: 'Jopnifes', postalCode: '5352-457' }, status: 'full' },
  { id: 'VOoBRndMSCpSQgRC', name: 'Henrietta McBride', address: { addressLine1: '1802 Umari View', addressLine2: '7', city: 'Isukemapo', postalCode: '2232-629' }, status: 'free' },
  { id: 'BfvcLdJpFGKyQbcj', name: 'Hannah Harris', address: { addressLine1: '1621 Wopale Heights', addressLine2: '11', city: 'Lehmutil', postalCode: '1611-333' }, status: 'assigned' },
  { id: 'IulJUoOYulAKyFUg', name: 'Essie Schultz', address: { addressLine1: '579 Ijirop View', addressLine2: '11', city: 'Igigalo', postalCode: '7636-686' }, status: 'assigned' },
  { id: 'ssoeBixamnuXzHVj', name: 'Nancy Benson', address: { addressLine1: '645 Galda Manor', addressLine2: '8', city: 'Cipuvaj', postalCode: '6146-998' }, status: 'assigned' },
  { id: 'jPPFAddUsyLLRWBl', name: 'Lois Cole', address: { addressLine1: '1517 Naoh Terrace', addressLine2: '8', city: 'Igediva', postalCode: '8155-826' }, status: 'assigned' },
  { id: 'BFIIAcWbeHbGSKZh', name: 'Brett Carpenter', address: { addressLine1: '806 Sujkas Glen', addressLine2: '7', city: 'Nivehre', postalCode: '7341-726' }, status: 'free' },
  { id: 'XAqsqWhppiwIXZgV', name: 'Norman Kim', address: { addressLine1: '1519 Gagi Way', addressLine2: '6', city: 'Zacaraje', postalCode: '7254-743' }, status: 'assigned' },
  { id: 'RFcRwUQVVSvYbEvN', name: 'Rodney Fleming', address: { addressLine1: '1131 Waped Road', addressLine2: '1', city: 'Wodobbuh', postalCode: '8961-799' }, status: 'full' },
  { id: 'gebJYSjRAZFoJsIA', name: 'Florence Matthews', address: { addressLine1: '842 Wepic Square', addressLine2: '6', city: 'Vedelat', postalCode: '8157-669' }, status: 'assigned' },
  { id: 'WlUhHTXNfIPBjCPC', name: 'Nannie Robertson', address: { addressLine1: '1750 Febul Place', addressLine2: '5', city: 'Vuvafuobu', postalCode: '5417-343' }, status: 'free' },
  { id: 'IEOhNzhwSBdxHsmG', name: 'Lottie Holmes', address: { addressLine1: '1500 Pabhug Heights', addressLine2: '9', city: 'Ohikiku', postalCode: '3314-991' }, status: 'assigned' },
  { id: 'aHIKhPwvUQeovikF', name: 'Millie Todd', address: { addressLine1: '1223 Etdo Glen', addressLine2: '9', city: 'Pediwowe', postalCode: '4632-351' }, status: 'full' },
  { id: 'pfElARhjQXQcAzNN', name: 'Carrie Carroll', address: { addressLine1: '1717 Kenpit Glen', addressLine2: '2', city: 'Hijihkal', postalCode: '4778-647' }, status: 'free' },
  { id: 'fzguDJgAiSrgZgFM', name: 'Keith McKinney', address: { addressLine1: '1948 Asmi Key', addressLine2: '11', city: 'Putebjog', postalCode: '8164-452' }, status: 'full' },
  { id: 'cIgfhQXzQzFjQufx', name: 'Mollie Pearson', address: { addressLine1: '229 Dunusi Avenue', addressLine2: '9', city: 'Lipehvig', postalCode: '8932-481' }, status: 'assigned' },
  { id: 'oQBNxpRMIyScitzi', name: 'Alta Benson', address: { addressLine1: '144 Poraw Court', addressLine2: '12', city: 'Huciev', postalCode: '3811-437' }, status: 'full' },
  { id: 'TEtFGGPyTJgzWVyy', name: 'Dorothy Bryan', address: { addressLine1: '1045 Vapfa Circle', addressLine2: '10', city: 'Kojawureg', postalCode: '6959-638' }, status: 'assigned' },
];

const Boxes = () => {

  useEffect(
    () => {
      api.login({ username: 'user' }, (a) => console.log(a));
    }
  );

  return (
    <Layout>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <BoxesList boxes={boxesStub} />
        </Paper>
      </Container>
    </Layout>
  );
};

export default Boxes;