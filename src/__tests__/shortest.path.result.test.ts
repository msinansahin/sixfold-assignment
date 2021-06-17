import {ShortestPathResult} from '../dto/shortest.path.result';

test('construct link given multi path', () => {
    const paths: any[] = [{id: 'b'}, {id: 'c'}, {id: 'a'}, {id: 'z'}];
    const test = new ShortestPathResult(paths);
    // paths is reversed in ShortestPathResult construction, ngraph returns as from node is the in the end of array
    expect(test.prettyString()).toBe("z -> a -> c -> b");
});

test('construct link given one path', () => {
    const paths: any[] = [{id: 'b'}];
    const test = new ShortestPathResult(paths);
    expect(test.prettyString()).toBe("b");
});

test('construct link (empty) given null path', () => {
    const paths: any[] = null;
    const test = new ShortestPathResult(paths);
    expect(test.prettyString()).toBe("");
});
