;'use strict';

function SelectorFinder() {

    const functionalAttributes = ['target', /ngcontent/];
    const functionalAttributesFilter = ({ name }) => !functionalAttributes.some(v => name.match(v));
    const getSiblingLabel = function (e) {
        if(!e.parentNode) {
            return siblings;
        }
        let sibling  = e.parentNode.firstChild;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e && sibling.tagName.toLowerCase() === 'label') {
                return sibling
            }
            sibling = sibling.nextSibling;
        }
        return null;
    };

    this.attributes = (element) => [...element.attributes]
        .filter(functionalAttributesFilter)
        .map( ({ name, value }) => ({ name, value }) );

    this.label = (element) => getSiblingLabel(element) || element.closest('label');
    this.labelAttributesAndText = (element) => {
        const label = this.label(element);
        return { attributes: this.attributes(label), text: label.innerText };
    }
}

function ScriptRecorder() {
    const interaction = rrweb.EventType.IncrementalSnapshot;
    const input = rrweb.IncrementalSource.Input;
    const finder = new SelectorFinder();
    const events = [];

    const uniqueInputEvents = (events) =>
        events.filter(({ event: e }, index, arr) => {

            return e.type !== interaction || e.data.source !== input
                || arr.findIndex(({ event: v }) => v.data.source === input && v.data.id === arr[index].event.data.id) === index
        });

    this.start = () => {
        this.stop = rrweb.record({
            emit: (event) => {
                const log = { event };
                if (event.type === interaction && event.data.source === input) {
                    const element = rrweb.mirror.getNode(event.data.id);
                    log.attributes = finder.attributes(element);
                    log.label = finder.labelAttributesAndText(element);
                    console.log(log)
                }
                events.push(log);
            },
        })
    };
    this.stop = () => { console.warn('Stop before started') };
    // this.getEvents = () => uniqueInputEvents(events);
    this.getEvents = () => events;

}
