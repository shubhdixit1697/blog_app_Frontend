import java.util.ArrayList;
import java.util.Collections;

public class Main {

	public static void main(String[] args) {
		ArrayList<Employee> emp=new ArrayList<>();
		
		emp.add(new Employee("Shubham",1,new Address("Up","Kanpur")));
		emp.add(new Employee("Harshit",2,new Address("MP","Bhopal")));
		emp.add(new Employee("Raina",3,new Address("Rj","Kota")));
		emp.add(new Employee("Abhishek",4,new Address("JK","Kashmir")));
		
		Collections.sort(emp,new IdSort());
		
		System.out.println(emp);
		

	}

}
