# 链表基本概念

[leetCode 链表专题](https://leetcode-cn.com/leetbook/read/linked-list/jbex5/)

```JS
/**
 * 定义链表的节点
 * @param {*} val 节点的值
 * @param {ListNode} next 下一个节点
 */
var ListNode = function (val) {
    this.val = val;
    this.next = null;
};

/**
 * Initialize your data structure here.
 */
var MyLinkedList = function () {
    this.head = null;
    this.length = 0;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index > this.length - 1) return -1;
    let current = this.head;
    for (let i = 0; i < index; i++) {
        if (current.next) {
            current = current.next;
        } else {
            return -1;
        }
    }
    return current.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    let node = new ListNode(val);
    let cur = this.head;
    this.head = node;
    node.next = cur;
    this.length++;
};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    var node = new ListNode(val);
    if (!this.head) {
        this.head = node;
    } else {
        var cur = this.head;
        while (cur && cur.next) {
            cur = cur.next;
        }
        cur.next = node;
    }
    this.length++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index < -1 || index > this.length) return;
    if (index === this.length) return this.addAtTail(val);
    if (index === 0) return this.addAtHead(val);
    let node = new ListNode(val);
    let curNode = this.head;
    while (index > 1) {
        curNode = curNode.next;
        index--;
    }
    let temp = curNode.next;
    curNode.next = node;
    node.next = temp;
    this.length++;
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index > this.length - 1) return;
    if (index == 0) {
        this.head = this.head.next;
        this.length--;
        return;
    }
    let node = this.head;
    while (index > 1) {
        node = node.next;
        index--;
    }
    if (node.next.next) {
        node.next = node.next.next;
    } else {
        node.next = null;
    }

    this.length--;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

```
