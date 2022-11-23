<script lang="ts">
    import { TaskStatus } from "./lib/task-status.enum";

  import { Task } from "./lib/task.interface";
  import { TodoMode } from "./lib/todo-mode.enum";

  let input: string = '';
  let taskCardIdTobeEdited: string;

  let todoMode: TodoMode = TodoMode.Normal;

  let taskCounter: number = 0;

  let taskList: Task[] = [
    new Task(String(taskCounter++), "Finish Todo"),
    new Task(String(taskCounter++), "Finish Prototype1"),
    new Task(String(taskCounter++), "Lorem Ipsum"),
    new Task(String(taskCounter++), "Ameno Dorime"),
    new Task(String(taskCounter++), "Test Bash Script"),
  ];

  const handleInputKeyPress = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (input.trimStart() === '') return;

    if(todoMode === TodoMode.Editing){
      taskList = taskList.map(task => {
        if(task.id === taskCardIdTobeEdited){
          task.description = input;
        }
        return task;
      })
      todoMode = TodoMode.Normal;
    }
    else{
      taskList = [...taskList, new Task(String(taskCounter++), input)];
    }

    input = '';
  }

  const handleTaskInputFocusOut = () => {
    if(todoMode === TodoMode.Editing){
      input = '';
      todoMode = TodoMode.Normal;
      document.getElementById(`${taskCardIdTobeEdited}-task-card`).toggleAttribute('editing');
    }
  }

  const handleClickDeleteBtn = (taskId: string) => {
    taskList = taskList.filter(task => {return task.id !== taskId});
  }

  const handleClickTaskDescription = (id: string, description: string) => {
    handleTaskInputFocusOut();

    taskCardIdTobeEdited = id;
    input = description;
    document.getElementById(`${id}-task-card`).toggleAttribute('editing');

    todoMode = TodoMode.Editing;
    document.getElementById('task-input').focus();
  }

  const handleChangeToggleEl = (task: Task) => {
    if(task.status === TaskStatus.Unfinished){
      task.finishTask();
    }
    else{
      task.restartTask();
    }

    taskList = taskList.map(innerTask => {
      if(innerTask.id === task.id){
          innerTask = task;
      }
      return innerTask;
    })
  }
</script>

<main>
  <div class="flex flex-col items-center mt-4">
    <div class="text-4xl font-bold"> 
      Todo App
    </div>

    <div>
      <input
        id="task-input"
        bind:value={input}
        on:keypress={handleInputKeyPress}
        on:focusout={handleTaskInputFocusOut}
        class="mt-8 rounded-md w-[42rem] h-8"
      >
    </div>
    
    <div class="flex flex-col">
      {#each taskList as task }
        <div id="{task.id}-task-card" class="task-card flex flex-row mt-4">
          <input type="checkbox" on:change={() => handleChangeToggleEl(task)}>
          <div class="ml-2 mr-2 w-[36rem] max-w-xl break-all text-justify" >
            <div on:mousedown|preventDefault={() => handleClickTaskDescription(task.id, task.description)}>
              {task.description}
            </div>
          </div>
          <button on:click={() => handleClickDeleteBtn(task.id)}>DELETE</button>
        </div>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  .task-card{
    > input:checked ~ div {
      text-decoration: line-through;
      opacity: 50%
    }
  }
</style>
