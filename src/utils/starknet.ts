import { RpcProvider, constants } from 'starknet';
import { keccak256 } from 'js-sha3';

export async function getContractsMethods(contractAddress: string) {
  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });

  let contractAbi;
  try {
    const compressedContract = await provider.getClassAt(contractAddress);
    contractAbi = compressedContract.abi;
  } catch (e) {
    console.error(e);
    return [];
  }

  const funtionItems = contractAbi.filter((abi) => 'items' in abi).reduce((acc, current) => acc.concat(current.items), []);
  return funtionItems;
}

interface FunctionItem {
  name: string;
  inputs: { type: string }[];
  type: string;
}

//simply the flow of the function:
//get functionItems array from getContractsMethods function as input
//return the name, input and output from functionItems array
//get signature into hash and return the corresponding selector
export function generateEntrypointsSelector(functionItems: FunctionItem[]) {
  return functionItems.map((funcItem) => {
    const signature = `${funcItem.name}(${funcItem.inputs.map(input => input.type).join(',')})`;
    const hash = keccak256(signature);
    const selector = hash.substring(0, 8);
    return selector;
  });
}

export async function getContractsCustomStructs() {
  // TODO: Should return contracts' custom structs.
}
