describe("Test Open/Close Modal", ()=> {

    beforeEach(()=> {
        cy.openModal()
    })

    it("Test if chat modal exist once click the main button", ()=> {
        cy.get("article[data-e2e-modal-container]").should("be.visible")
    })

    it("Close Modal", ()=> {
        cy.get("button[data-e2e-modal-button-close]").click().then(()=> {
            cy.wait(500) // wait animation end
            cy.get("article[data-e2e-modal-container]").should("not.exist")
        })
    });

})