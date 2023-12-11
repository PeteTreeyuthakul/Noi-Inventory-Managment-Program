describe("Test for the warningItem function",()=>{
    it (`It should contain item1'.`, ()=>{
        const testItem1 = new Item('item1','item1Type','item1sup','e','p','w',10,11)
        itemObj.push(testItem1)
        const result1 = warningItem()
        const expect1 = 'item1'
        
        expect(result1).toContain(expect1)
    })
})

describe("Test for the searchItem function",()=>{
    it (`It should contain item2.`, ()=>{
        const testItem2 = new Item('item2','item2Type','item2sup','e','p','w',9,10)
        itemObj.push(testItem2)
        const result2 = searchItem('item2')
        const expect2 = 'item2'
        debugger
        expect(result2).toContain(expect2)
    })
})

