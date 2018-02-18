import * as React from 'react';
import styled from 'styled-components';
import { TableRow } from 'components/tableRow';
const addresses = require('assets/json/addresses.json');

interface PTable {
  data: any;
}

const StyledTable = styled.div`
  max-height: 648px;
  overflow: scroll;
`;

import { store, RPCNode } from 'balancer';

let node = RPCNode('');

export class Table extends React.Component<PTable> {
  public state = addresses.addresses.reduce((accu, curr) => ({ ...accu, [curr]: 'pending' }), {});

  public componentDidMount = async () => {
    window.setTimeout(async () => {
      addresses.addresses.forEach(async (addr: any) => {
        const balance = await node.getBalance(addr);
        console.log('balance', balance.toString());
        this.setState({ addr: 'complete' });
      });
    }, 3000);
  };

  render() {
    return (
      <StyledTable>
        {addresses.addresses.map(addr => {
          return <TableRow key={addr} addr={addr} status={this.state[addr]} />;
        })}
      </StyledTable>
    );
  }
}
