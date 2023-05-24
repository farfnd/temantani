const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");

async function handle(message) {
    await handleNewProject(message)
}

async function handleNewProject(message) {
    try {
        console.log('Received message:', message);
        const projectRepo = repositories.projectRepository();
        const projectUseCase = useCases.projectUseCases(projectRepo);
        const project = await projectUseCase.create(message);

        console.log('New project created');
    } catch (error) {
        console.error('Error creating project from message:', error);
    }
}

module.exports = { handle };