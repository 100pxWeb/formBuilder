const FormInput = function(conf, childs) {
    this.childs = childs ? childs : []
    this.conf = conf
}

FormInput.prototype = {
    add: function(child) {
        this.childs.push(child)
    },

    getChild: function (i) {
        return this.childs[i];
    },

    remove: function (child) {
        this.childs = [];
    },

    setChilds: function (childs) {
        this.childs = childs
    },
 
    hasChildren: function () {
        return this.childs.length > 0;
    },

    getConf: function() { return this.conf },

    setConf: function(conf) { this.conf = conf }
}

export function traverse(indent, node, create) {
    let inde = indent++

    if (create) {
        create(node, inde)
    }

    for (let i = 0, len = node.childs.length; i < len; i++) {
        traverse(indent, node.getChild(i), create);
    }
}

export default FormInput