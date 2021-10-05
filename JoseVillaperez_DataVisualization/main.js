class Controller {
    constructor(){
        console.log('Controller Created.');
        this.model = new Model();
        this.view = new View();
        const submitButton = document.querySelector('#submit').addEventListener('click', e=>{this.submitClicked(e)});
    }

    static getInstance(){
        if(!Controller._instance){
            Controller._instance = new Controller();
            return Controller._instance;
        }else{
            throw 'You cannot create a second controller';
        }
    }

    submitClicked(e){
        // get data from the inputs
        let grade1 = Number(document.querySelector('#gradeOne').value);
        let grade2 = Number(document.querySelector('#gradeTwo').value);
        let grade3 = Number(document.querySelector('#gradeThree').value);
        // create an empty array to hold the grades
        this.gradeArray = [];
        // validate data
        let valid = Utils.validateGrades(grade1, grade2, grade3);

        if(valid){
            // clear any alerts
            Utils.clearError();
            
            document.querySelector('Form').reset();

            // if valid add to array
            this.gradeArray.push(grade1, grade2, grade3);

            // create new event 
            let evt = new Event('controller_done');
            evt.data = this.gradeArray;
            document.dispatchEvent(evt);
        }
        else{
            // else throw error
            Utils.displayError('Please enter valid grades (0 - 100%)');
        }
    }
}

class Model {
    constructor(){
        console.log('Model Created.');
    }
}

class View {
    constructor(){
        console.log('View Created.');
        document.addEventListener('controller_done', e=>{this.displayChart(e)});
    }

    displayChart(e){
        // array from event object
        let grades = e.data;
        
        // get canvas and context
        let canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');

        // chart info
        // let barWidth = 40;
        let barGap = 70;
        let base = canvas.height - 50;

        // create bars
        this.createBar(grades, ctx, base, barGap);
        // create grid
        this.createGrid(ctx, canvas, base, barGap);

    }

    createBar(grades, ctx, base, gap){
        // set bar width and color
        let barWidth = 40;
        ctx.fillStyle = '#0066ff';
        // loop through each grade and create a rect of that size
        grades.forEach(grade => {
            // create bar for each grade
            let height = grade;
            ctx.fillRect(gap, base - height, barWidth, height);
            
            // add grade label to the bar
            ctx.fillText(`${grade}%`, gap+10, (base-height) - 10);

            // increase gap size for next bar
            gap += barWidth+40;
        });

    }

    createGrid(ctx,canvas,base,gap){
        // create x axis
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(50, base + 1);
        ctx.lineTo(300, base + 1);
        ctx.stroke();
        ctx.closePath();

        // create y axis
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(50, 20);
        ctx.lineTo(50, base + 1);
        ctx.stroke();
        ctx.closePath();

        // labels on x axis
        ctx.font = '16px arial';
        ctx.fillText('Grades',140, base + 30);

        // labels on y axis
        ctx.font = '16px arial';
        ctx.fillText('Score',2, canvas.height/2);
    }
}


(()=>{
    const myAssignment = Controller.getInstance();
    console.log('Assignment Started');
})();