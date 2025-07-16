package com.backend.cetpro.Service.StudentService;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.backend.cetpro.Controller.Dto.StudentItem;
import com.backend.cetpro.Repository.StudentRepository;
import com.backend.cetpro.Repository.Entity.StudentEntity;
import com.backend.cetpro.Service.Mapper.StudentMapper;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository){
        this.studentRepository=studentRepository;
    }

    public List<StudentItem> list() {
        return studentRepository.findAll().stream()
        .map(e->StudentMapper.fromEntityToDto(e, new StudentItem()))
        .collect(Collectors.toList());

    }

    public List<StudentItem> listName(String nombre) {
        return studentRepository.findByNombreContainingIgnoreCase(nombre)
        .stream()
        .map(e -> StudentMapper.fromEntityToDto(e, new StudentItem()))
        .collect(Collectors.toList());
    }

    public void create(StudentItem item) {

        StudentEntity entity=StudentMapper.fromDtoToEntity(item, new StudentEntity());
        studentRepository.save(entity);

    }

    public void update (Integer id, StudentItem item){

        StudentEntity entity=studentRepository.getReferenceById(id);
        entity.setNombre(item.getNombre());
        entity.setDni(item.getDni());
        entity.setTelefono(item.getTelefono());
        entity.setFechaNacimiento(item.getFechaNacimiento());
        entity.setGradoInstruccion(item.getGradoInstruccion());
        entity.setDireccion(item.getDireccion());

        studentRepository.save(entity);
    }

    public void delete(Integer id){
        studentRepository.deleteById(id);
    }

    public void deleteAllStudent(){
        studentRepository.deleteAll();
    }

    public ByteArrayInputStream generateExcel(List<StudentItem> students) {
    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
        Sheet sheet = workbook.createSheet("Alumnos");

        String[] headers = {"ID", "Nombre", "DNI", "Teléfono", "Fecha Nacimiento", "Grado Instrucción", "Dirección"};

        
        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 14);
        titleStyle.setFont(titleFont);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        
        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);

       
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(1); 
        titleCell.setCellValue("LISTA DE ALUMNOS");
        titleCell.setCellStyle(titleStyle);

        
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 7));

        
        Row headerRow = sheet.createRow(1);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i + 1); 
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        
        int rowIdx = 2;
        for (StudentItem student : students) {
            Row row = sheet.createRow(rowIdx++);

            Cell c0 = row.createCell(1);
            c0.setCellValue(student.getIdAlumno());
            c0.setCellStyle(dataStyle);

            Cell c1 = row.createCell(2);
            c1.setCellValue(student.getNombre());
            c1.setCellStyle(dataStyle);

            Cell c2 = row.createCell(3);
            c2.setCellValue(student.getDni());
            c2.setCellStyle(dataStyle);

            Cell c3 = row.createCell(4);
            c3.setCellValue(student.getTelefono());
            c3.setCellStyle(dataStyle);

            Cell c4 = row.createCell(5);
            c4.setCellValue(student.getFechaNacimiento() != null ? student.getFechaNacimiento().toString() : "");
            c4.setCellStyle(dataStyle);

            Cell c5 = row.createCell(6);
            c5.setCellValue(student.getGradoInstruccion());
            c5.setCellStyle(dataStyle);

            Cell c6 = row.createCell(7);
            c6.setCellValue(student.getDireccion());
            c6.setCellStyle(dataStyle);
        }

       
        for (int i = 1; i <= 7; i++) {
            sheet.autoSizeColumn(i);
        }

        workbook.write(out);
        return new ByteArrayInputStream(out.toByteArray());

    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}



}
