class Matrix
{
	constructor (rows,cols)
	{
		this.rows=rows;
		this.cols=cols;
		this.data=[];
		for(let i=0;i<this.rows;i++)
		{
			this.data[i]=[];
			for(let j=0;j<this.cols;j++)
			{
				let temp=this.data[i];
				temp[j]=0;
				//this.data[i][j]=0;
			}
		}
	}
	static transpose(matrix)
	{
		let result = new Matrix(matrix.cols,matrix.rows)
		
		for (let i=0;i<matrix.rows;i++)
		{
			for(let j=0;j<matrix.cols;j++)
			{
				result.data[j][i]=matrix.data[i][j];
			}
		}
		return result;
		
	}
	toArray()
	{
		let arr=[];
		for(let i=0;i<this.rows;i++)
		{
			
			for(let j=0;j<this.cols;j++)
			{
				arr.push(this.data[i][j]);
			}
			
		}
		return arr;

	}
	static fromArray(arr)
	{
		let m= new Matrix(arr.length,1);
		let v= arr.length;
		for(let i=0;i<v;i++)
		{
			m.data[i][0]=arr[i];
		}
		return m;
	}
	randomize()
	{
		for(let i=0;i<this.rows;i++)
		{
			
			for(let j=0;j<this.cols;j++)
			{
				this.data[i][j]=Math.floor(Math.random()*2 -1);
			}
		}

	}
	static subtract(a,b)
	{
		let result= new Matrix(a.rows,a.cols);
		for( let i=0;i<result.rows;i++)
			{
				for(let j=0;j<result.cols;j++)
				{
					result.data[i][j]=a.data[i][j]-b.data[i][j];
				}
			}
		return result;
	}
	add(n) 
	{
		if(n instanceof Matrix)
		{
			for( let i=0;i<this.rows;i++)
			{
				for(let j=0;j<this.cols;j++)
				{
					this.data[i][j]+=n.data[i][j];
				}
			}
		}
		else
		{
			for( let i=0;i<this.rows;i++)
			{
				for(let j=0;j<this.cols;j++)
				{
					this.data[i][j]+=n;
				}
			}
		}
	}
	static multiply(a,b)
	{
		if(a.cols!==b.rows)
			{
				console.log("Error 001");
				return undefined;
			}
			let result = new Matrix(a.rows,b.cols);
			let sum=0;
			
			for(let i=0;i<result.rows;i++)
			{
				for(let j=0;j<result.cols;j++)
				{
					sum=0;
					for(let k=0;k<a.cols;k++)
					{
						sum+=a.data[i][k]*b.data[k][j];
					}
					result.data[i][j]=sum;
				}

			}
			return result;
	}
	multiply(n) {
    if (n instanceof Matrix) {
      // hadamard product
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
      // Scalar product
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  }
	map(func)
	{
		//Apply a fucntion to every element 
		for( let i=0;i<this.rows;i++)
		{
			for(let j=0;j<this.cols;j++)
	 		{
	 			let val = this.data[i][j];
				this.data[i][j]=func(val);
			}
		}
	}
	static map(matrix,func)
	{
		let result= new Matrix(matrix.rows, matrix.cols);
		for(let i=0;i<matrix.rows;i++)
		{
			for(let j=0;j<matrix.cols;j++)
			{
				let val= matrix.data[i][j];
				result.data[i][j]=func(val);
			}
		}
		return result;
	}
	print()
	{
		console.table(this.data);
	}
}