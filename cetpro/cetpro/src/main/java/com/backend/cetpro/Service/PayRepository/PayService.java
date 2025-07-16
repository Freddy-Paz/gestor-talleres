package com.backend.cetpro.Service.PayRepository;

import java.util.List;

import com.backend.cetpro.Controller.Dto.PayItem;

public interface PayService {

    List<PayItem> list();

    void create(PayItem item);

    void delete(Integer id);

}
