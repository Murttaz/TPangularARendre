export class Todo {
  
  
  constructor(
    public id?: number,
    public text?: string,
    public done: boolean = false,
    public userId?: number,
    public _isEditable: boolean = true
  ) {}
}