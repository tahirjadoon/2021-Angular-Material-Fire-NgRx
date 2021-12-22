export class ExerciseModel{
  constructor(
    public id: string, 
    public name: string, 
    public duration: number, 
    public calories: number,
    public date?: Date,
    public state?: 'completed' | 'cancelled' | null
  ){}
}
