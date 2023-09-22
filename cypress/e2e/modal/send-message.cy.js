const newTextMessage = "Esto es un nuevo mensaje :)";
const newFileMessageUrl = "src/assets/Titulo del archivo a subir 2.pdf";
const newFileMessageName = "archivo.pdf";

function uploadFile() {
    cy.get("form[data-e2e-modal-form]")
        .find("input[data-e2e-modal-form-attach-input]")
        .selectFile([{
            contents: newFileMessageUrl,
            fileName: newFileMessageName, // Set new name to check the text message
        }], {force: true})
}

describe("Test The content of Modal", ()=> {

    beforeEach(()=> {
        cy.openModal()
    })

    it("Test send text message", ()=> {
        // Text input
        cy.get("form[data-e2e-modal-form]")
            .find("input[data-e2e-modal-form-text-input]")
            .should("not.be.disabled")
            .type(newTextMessage)

        // Check if input file is disabled
        cy.get("form[data-e2e-modal-form]")
            .find("input[data-e2e-modal-form-attach-input]")
            .should("be.disabled")

        // Submit message
        cy.get("form[data-e2e-modal-form]")
            .find("button[data-e2e-modal-form-submit-button]")
            .click()

        cy.wait(1000)

        // Check new message in messages list
        cy.get("ul[data-e2e-modal-messages-list] > li")
            .last()
            .find("p")
            .should("have.text", newTextMessage)
    });

    it("Test send file message", ()=> {
        // Upload file
        uploadFile()

        // Check if input text is disabled
        cy.get("form[data-e2e-modal-form]")
            .find("input[data-e2e-modal-form-text-input]")
            .should("be.disabled")

        // Remove attached file
        cy.get("form[data-e2e-modal-form]")
            .find("button[data-e2e-modal-form-remove-attach]")
            .should("exist")
            .click()

        // Upload file again
        uploadFile()

        // Submit message
        cy.get("form[data-e2e-modal-form]")
            .find("button[data-e2e-modal-form-submit-button]")
            .click()

        cy.wait(1000)

        // Check new message in messages list
        cy.get("ul[data-e2e-modal-messages-list] > li")
            .last()
            .find("p[data-e2e-modal-message-type-document-name]")
            .first()
            .should("have.text", newFileMessageName)
    });

})