// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract School {
   
    enum PersonelType {
        TEACHER,
        STUDENT,
        NONE
    }
    struct Student {
        address studentAddress;
        string name;
        string surname;
        string schoolNo;
        uint amount;
    }

    struct Teacher {
        address teacherAddress;
        string name;
        string surname;
        string field;
    }

    struct Class {
        string name;
        string className;
        uint chairNumber;
        Teacher teacher;
        string date;
        string hour;
        Student[] students;
    }
    


    address owner;
    address signUserAddress;
    address cahceUserAddress;
    Student[] students;
    Teacher[] teachers;
    uint[] public classIds;
    bool isFound;
    mapping (uint => Class) classes; 
    uint public classCount;

    event ClassCreated(uint classId, string name, string className, string date, string hour, uint chairNumber);
    constructor() {
        owner = msg.sender;
    }

    function createCacheUserAddress(address _cahceUserAddress) public  {
        cahceUserAddress = _cahceUserAddress;
    }

    function getCacheUserAddress() public view returns(address) {
        return cahceUserAddress;
    }

    function registerStudent(address _address, string calldata _name, string calldata _surname, string calldata _schoolNo) public {
        Student memory student;
        student.studentAddress = _address;
        student.name = _name;
        student.surname = _surname;
        student.schoolNo = _schoolNo;
        student.amount = 0;
        students.push(student);
    }

    function signUser(address _signUserAddress,PersonelType _personelType) public {
       (bool isPersonel,PersonelType personel) = signUserControl(_signUserAddress,_personelType);
       if(isPersonel) {
            signUserAddress = _signUserAddress;
       }
       else {
           revert("personel is not found");
       }
    }

    function signUserControl(address _signUserAddress,PersonelType _personelType) public view returns(bool,PersonelType) {
        if(_personelType == PersonelType.TEACHER) {
            if(isTeacher(_signUserAddress)) {
                return (true,PersonelType.TEACHER);
            }
            return (false,PersonelType.NONE);
        }
        if(_personelType == PersonelType.STUDENT) {
            (bool _isStudent,uint index) = isStudent(_signUserAddress);
            if(_isStudent) {
                return (true,PersonelType.STUDENT);
            }
            return (false,PersonelType.NONE);
        }
        return (false,PersonelType.NONE);
    }

    function getSignUser() public view returns(address) {
        return signUserAddress;
    }

    function registerTeacher(address _address, string calldata _name, string calldata _surname, string calldata _field) public {
        Teacher memory teacher;
        teacher.teacherAddress = _address;
        teacher.name = _name;
        teacher.surname = _surname;
        teacher.field = _field;
        teachers.push(teacher);
    }
 
    function createClass(string calldata _name,string calldata _className,string calldata _date,string calldata _hour,uint _chairNumber) public {
        Class storage newClass = classes[classCount];
        newClass.name = _name;
        newClass.className = _className;
        newClass.chairNumber = _chairNumber;
        newClass.date = _date;
        newClass.hour = _hour;
        classIds.push(classCount);
        emit ClassCreated(classCount, _name, _className, _date, _hour, _chairNumber);
        classCount++;
    }
    function assignTeacherToClasses(uint classId,address teacherAddress) public {
        Class memory class = classes[classId];
        class.teacher = getTeacherInfo(teacherAddress);
        
    }
    function resetStudent() public {
        uint numClasses = classIds.length;
        for(uint i = 0;i<numClasses;i++) {
            Class storage currentClass = classes[classIds[i]];
            delete currentClass.students;
        }
    }

 function findStudent(address _address) public view returns (string memory, string memory, string memory, string memory, uint, Student memory) {
        for (uint i = 0; i < classIds.length; i++) {
            Class storage currentClass = classes[classIds[i]];
            for (uint j = 0; j < currentClass.students.length; j++) {
                if (currentClass.students[j].studentAddress == _address) {
                    Student memory foundStudent = currentClass.students[j];
                    return (
                        currentClass.name,
                        currentClass.className,
                        currentClass.date,
                        currentClass.hour,
                        currentClass.chairNumber,
                        foundStudent
                    );
                }
            }
        }
        revert("Student not found in any class");
    }
    function assignStudentsToClasses() public {
        uint numStudents = students.length;
        uint numClasses = classIds.length;
        shuffleStudents(); 
        shuffleClasses(); 
        uint studentIndex = 0;
        for (uint i = 0; i < numClasses && studentIndex < numStudents; i++) {
            Class storage currentClass = classes[classIds[i]];
            uint numToAdd = getRandomNumber(numStudents - studentIndex); 
            for (uint j = 0; j < numToAdd && studentIndex < numStudents; j++) {
                currentClass.students.push(students[studentIndex]);
                studentIndex++;
            }
        }
    }

    function getAllClasses() public view returns (Class[] memory) {
        Class[] memory allClasses = new Class[](classIds.length);
        for (uint i = 0; i < classIds.length; i++) {
            uint classId = classIds[i];
            allClasses[i] = classes[classId];
        }
        return allClasses;
    }

    function getClass(uint classId) public view returns (string memory, Teacher memory, Student[] memory) {
        Class storage classInfo = classes[classId];
        return (classInfo.name, classInfo.teacher, classInfo.students);
    }

    function getStudents() public view returns (Student[] memory) {
        return students;
    }

    function signStudent(address _studentAddress) payable public {
        (bool isControl, uint index) = isStudent(_studentAddress);
        require(isControl, "Student not found");
        payable(students[index].studentAddress).transfer(msg.value / 1000);
        students[index].amount += msg.value / 1000;
    }

    function isStudent(address _address) internal view returns (bool, uint) {
        for (uint i = 0; i < students.length; i++) {
            if (students[i].studentAddress == _address) {
                return (true, i);
            }
        }
        return (false, 0);
    }
    function isTeacher(address _address) internal view returns (bool) {
        for (uint i = 0; i < teachers.length; i++) {
            if(teachers[i].teacherAddress == _address) {
                return true;
            }
        }
        return false;
    }

    function getStudentInfo(address _address) public view returns (Student memory) {
        return studentInfo(_address);
    }

    function getTeacherInfo(address _address) public view returns(Teacher memory) {
        return teacherInfo(_address);
    }

    function studentInfo(address _address) internal view returns (Student memory) {
        for (uint i = 0; i < students.length; i++) {
            if (students[i].studentAddress == _address) {
                return (students[i]);
            }
        }
        revert("Student not found");
    }
    function teacherInfo(address _address) internal view returns(Teacher memory) {
        for(uint i = 0;i<teachers.length;i++) {
        if(teachers[i].teacherAddress == _address) {
            return (teachers[i]);
        }
    }
    }

    function shuffleStudents() internal {
        uint n = students.length;
        while (n > 1) {
            n--;
            uint randIndex = uint(keccak256(abi.encodePacked(block.number, blockhash(block.number - 1), n))) % (n + 1);
            Student memory temp = students[randIndex];
            students[randIndex] = students[n];
            students[n] = temp;
        }
    }

    function shuffleClasses() internal {
        uint n = classIds.length;
        while (n > 1) {
            n--;
            uint randIndex = uint(keccak256(abi.encodePacked(block.number, blockhash(block.number - 1), n))) % (n + 1);
            uint temp = classIds[randIndex];
            classIds[randIndex] = classIds[n];
            classIds[n] = temp;
        }
    }

    function getRandomNumber(uint max) private view returns (uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % max + 1;
        return randomNumber;
    }
}

