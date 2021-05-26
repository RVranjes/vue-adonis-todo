'use strict'

const Project = use ('App/Models/Project');
const Task = use ('App/Models/Task');



class TaskController {

    async index ({auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project, user);
        return await project.tasks().fetch();
    }

    async create({ auth, request, paramas}) {
        const user = await auth.getUser();
        const { description } = request.all();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project, user);
        const task = new Task();
        task.fill({
            description,
        });
        await project.tasks().save(task); 
        return task;
    }

    async destroy ({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        AuthorizationService.verifyPermission(project, user);
        await task.delete();
        return project;
    }

    async update ({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        AuthorizationService.verifyPermission(project, user);
        task.merge(request.only([
            'description',
            'completed',
        ]));
        await task.save();
        return project;
    }
}

module.exports = TaskController
