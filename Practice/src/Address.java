import java.lang.Comparable;
public class Address implements Comparable<Address>{
	
	
	
	String place;
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getCity() {
		return City;
	}
	public void setCity(String city) {
		City = city;
	}
	String City;
	
	public Address(String place, String city) {
		super();
		this.place = place;
		this.City = city;
	}
	
//	@Override
//	public int compareTo(Address o) {
//		// TODO Auto-generated method stub
//		return this.place - o.place;
//	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return  "(" + place + "," +City + ")";
	}
	@Override
	public int compareTo(Address o) {
		// TODO Auto-generated method stub
		return this.City.compareTo(City);
	}
	
	

}
