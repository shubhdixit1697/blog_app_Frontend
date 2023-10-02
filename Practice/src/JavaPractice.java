import java.io.*;
import java.util.*;

public class JavaPractice {

	public static void main(String[] args) {
		String str="Sandeep";
		int[] numarr={1,2,5,3,6,3,4,8,9,6};
		System.out.println(removedupli(str));
		System.out.println(missingNumber(numarr,numarr.length));

	}
	
	public static String removedupli(String str) {
		char arr[]=str.toCharArray();
		Set<Character> newString=new HashSet<>();
		for(char s:arr) {
			
			newString.add(s);
			
		}
		String result=newString.toString();
		return result;
	}
	
	public static int missingNumber(int[] arr,int n) {
		System.out.println(Arrays.toString(arr));
		Set<Integer> missnumberset=new HashSet<>();
		for(int a:arr) {
			
			missnumberset.add(a);
			
		}
		System.out.println(missnumberset);
		int i=1;
		int missingnumber=0;
		
		for(i=1;i<n;i++) {
			
			if(missnumberset.add(i)) {
				missingnumber=i;
			}
			
		}
		
		return missingnumber;
		

}
}
