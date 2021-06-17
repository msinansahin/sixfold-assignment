export class Node {
    airport: string;
    next: Node;
    ground = false;
}

/** ShortestPathResult class of the finding path */
export class ShortestPathResult {
    private readonly paths: any[];
    private _firstNode: Node;

    constructor(paths: any[]) {
        this.paths = paths == null ? [] : paths.reverse();
        this.init();
    }

    get firstNode(): Node {
        return this._firstNode;
    }

    getPrettyJson() {
        return {
            prettyPath: this.prettyString(),
            pathLink: this.firstNode
        }
    }

    prettyString() {
        function getLinkName(node: Node): string {
            if (node == null) {
                return "";
            } else if (node.next == null) {
                return node.airport;
            }
            return `${node.airport} -> ${getLinkName(node.next)}`
        }

        return getLinkName(this._firstNode);
    }

    // construct the link by the paths
    private init(): void {
        let tmpNodes = null;

        function addNode(root: any, path: any) {
            let temp = new Node();
            let ptr;
            temp.airport = path.id;
            temp.next = null;

            if (root == null) {
                root = temp;
            } else {
                ptr = root;
                while (ptr.next != null) {
                    ptr = ptr.next;
                }
                ptr.next = temp;
            }
            return root;
        }

        for (let i = 0; i < this.paths.length; i++) {
            tmpNodes = addNode(tmpNodes, this.paths[i]);
        }
        this._firstNode = tmpNodes;
    }
}

