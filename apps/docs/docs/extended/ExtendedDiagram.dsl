workspace extends ../AmazonWebServicesDeployment.dsl {
    name "Extended Workspace"
    description "This workspace is an extension of the AmazonWebServicesDeployment workspace."

    model {
        !include include.model.dsl
    }

}