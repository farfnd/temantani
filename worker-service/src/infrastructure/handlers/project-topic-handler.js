const useCases = require("../../application/use-cases/index.js");
const repositories = require("../../domain/repositories/index.js");

async function handleNewProject(message) {
    try {
        console.log('Received message:', message);
        const projectRepo = repositories.projectRepository();
        const projectUseCase = useCases.projectUseCases(projectRepo);
        const project = await projectUseCase.createProjectFromMessage(message);


    } catch (error) {
        console.error('Error creating project from message:', error);
    }
}

module.exports = { handleNewProject };