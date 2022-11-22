<script lang="ts">
  import { Task } from "./lib/task.interface";

  let input: string;

  let taskCounter: number = 0;

  let taskList: Task[] = [
    new Task(String(taskCounter++), "Finish Todo"),
    new Task(String(taskCounter++), "Finish Prototype1"),
    new Task(String(taskCounter++), "Lorem Ipsum"),
    new Task(String(taskCounter++), "Ameno Dorime"),
  ];

  const handleKeyPress = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      if(input.trimStart() !== ''){
        taskList = [...taskList, new Task(String(taskCounter++), input)];
        input = '';
      }
    }
  }

  const handleClickDeleteBtn = (e: MouseEvent) => {
    const taskCardEl: HTMLElement = e.composedPath().at(1) as HTMLElement;
    const taskCardId: string = taskCardEl.className.split(' ').at(0).split('-').at(0);
    
    taskList = taskList.filter(task => {return task.id !== taskCardId});
  }

  const handleChangeToggleEl = (e: Event) => {
    const inputEl: HTMLInputElement = e.target as HTMLInputElement;
    const taskCardEl: HTMLElement = e.composedPath().at(1) as HTMLElement;
    const taskCardId: string = taskCardEl.className.split(' ').at(0).split('-').at(0);

    if(inputEl.checked){
      taskList = taskList.map(task => {
        if(task.id === taskCardId){
          task.finishTask();
        }
        return task;
      })
    }
    else{
      taskList = taskList.map(task => {
        if(task.id === taskCardId){
          task.restartTask();
        }
        return task;
      })
    }
  }
</script>

<main>
  <div class="flex flex-col items-center mt-4">
    <div class="text-4xl font-bold"> 
      Todo App
    </div>

    <div>
      <input bind:value={input} on:keypress={handleKeyPress} class="mt-8 rounded-md w-[42rem] h-8">
    </div>
    
    <div class="flex flex-col">
      {#each taskList as task }
        <div class="{task.id}-task-card task-card flex flex-row mt-4">
          <input type="checkbox" on:change={handleChangeToggleEl}>
          <div class="ml-2 mr-2 w-[36rem] max-w-xl break-all text-justify">{task.description}</div>
          <button on:click={handleClickDeleteBtn}>DELETE</button>
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
