import * as React from 'react';
import { BoxAddress as BoxAddressType } from 'types';

import './styles.scss';

const BoxAddress = ({ address }: { address: BoxAddressType }) => {
  return (
    <div className="addressFields">
      <p>
        {`${address.addressLine1}${address.addressLine2 && ', '}${address.addressLine2 ? address.addressLine2 : ''}`}
      </p>
      <p>
        {address.postalCode}
      </p>
      <p>
        {address.city}
      </p>
    </div>);
};

export default BoxAddress;