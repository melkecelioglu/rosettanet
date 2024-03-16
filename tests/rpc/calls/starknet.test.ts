import { generateEntrypointsSelector } from '../../../src/utils/starknet';  // Update the path as necessary

interface FunctionItem {
  name: string;
  inputs: { type: string }[];
  type: string;
}

describe('generateEntrypointsSelector function', () => {
  it('correctly calculates selectors for provided function items', async () => {
    // Define some mock function items similar to what might be received from the StarkNet contract ABI
    const mockFunctionItems: FunctionItem[] = [
      {
        name: 'transfer',
        inputs: [{ type: 'address' }, { type: 'uint256' }],
        type: 'function',
      },
      {
        name: 'balanceOf',
        inputs: [{ type: 'address' }],
        type: 'function',
      },
    ];

    // Call generateEntrypointsSelector with the mock data
    const selectors = generateEntrypointsSelector(mockFunctionItems);

    // Define expected selectors. These values should be pre-computed for the test to validate against.
    const expectedSelectors = [
      'a9059cbb',  // selector for transfer(address,uint256)
      '70a08231',  // selector for balanceOf(address)
    ];

    // Assert that the generated selectors match the expected values
    expect(selectors).toEqual(expectedSelectors);
  });
});
