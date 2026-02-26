INSERT INTO amenities (name) VALUES 
('Wifi'),
('Thang máy'),
('Chỗ để xe'),
('Điều hòa'),
('Máy giặt'),
('Tủ lạnh'),
('Bếp nấu ăn'),
('Giờ giấc tự do'),
('Bảo vệ 24/7'),
('Nội thất đầy đủ');

INSERT INTO properties (id, title, description, address, ward, district, city, price, area, type, status, owner_id, created_at) VALUES 
(1, 'Phòng trọ sinh viên giá rẻ', 'Phòng gần trường đại học, đầy đủ tiện nghi.', '123 Nguyễn Lương Bằng', 'Hòa Khánh Bắc', 'Liên Chiểu', 'Đà Nẵng', 2500000, 20.5, 'ROOM', 'AVAILABLE', 2, NOW()),
(2, 'Căn hộ Studio hiện đại', 'Căn hộ mới xây, nội thất cơ bản.', '45 Lê Duẩn', 'Thạch Thang', 'Hải Châu', 'Đà Nẵng', 5000000, 35.0, 'APARTMENT', 'AVAILABLE', 2, NOW()),
(3, 'Nhà nguyên căn kiệt 7m', 'Nhà 2 tầng, phù hợp hộ gia đình.', '89 Điện Biên Phủ', 'Chính Gián', 'Thanh Khê', 'Đà Nẵng', 10000000, 80.0, 'HOUSE', 'AVAILABLE', 2, NOW()),
(4, 'Phòng trọ cao cấp có gác', 'Phòng mới, giờ giấc tự do.', '12 Hàm Nghi', 'Vĩnh Trung', 'Thanh Khê', 'Đà Nẵng', 3200000, 25.0, 'ROOM', 'RENTED', 2, NOW()),
(5, 'Căn hộ view biển Mỹ Khê', 'Full nội thất, view cực đẹp.', '10 Võ Nguyên Giáp', 'Phước Mỹ', 'Sơn Trà', 'Đà Nẵng', 12000000, 55.0, 'APARTMENT', 'AVAILABLE', 2, NOW()),
(6, 'Nhà phố kinh doanh nhỏ', 'Mặt tiền đường lớn, thuận tiện buôn bán.', '200 Cách Mạng Tháng 8', 'Khuê Trung', 'Cẩm Lệ', 'Đà Nẵng', 15000000, 100.0, 'HOUSE', 'HIDDEN', 2, NOW()),
(7, 'Phòng trọ gần khu công nghiệp', 'An ninh tốt, giá công nhân.', '55 số 4 KCN', 'Hòa Khánh Bắc', 'Liên Chiểu', 'Đà Nẵng', 1800000, 18.0, 'ROOM', 'AVAILABLE', 2, NOW()),
(8, 'Penthouse đẳng cấp', 'Sang trọng, hồ bơi riêng.', '01 Bạch Đằng', 'Thạch Thang', 'Hải Châu', 'Đà Nẵng', 50000000, 200.0, 'APARTMENT', 'AVAILABLE', 2, NOW()),
(9, 'Nhà vườn ngoại ô', 'Không gian xanh, yên tĩnh.', 'Quốc lộ 14B', 'Hòa Ninh', 'Hòa Vang', 'Đà Nẵng', 7000000, 150.0, 'HOUSE', 'AVAILABLE', 2, NOW()),
(10, 'Căn hộ dịch vụ Quận 1', 'Dịch vụ dọn dẹp hàng tuần.', '15 Pasteur', 'Hòa Thuận Đông', 'Hải Châu', 'Đà Nẵng', 9000000, 40.0, 'APARTMENT', 'RENTED', 2, NOW());

INSERT INTO room_details (property_id, capacity, has_rooftop) VALUES 
(1, 2, 0), -- Phòng trọ sinh viên, ở được 2 người, không gác
(4, 3, 1), -- Phòng cao cấp, ở được 3 người, có gác rooftop
(7, 1, 0); -- Phòng công nhân, ở được 1 người, không gác

INSERT INTO apartment_details (property_id, floor, bedrooms, bathrooms) VALUES 
(2, 3, 1, 1),  -- Căn hộ Studio, tầng 3, 1 ngủ, 1 khách
(5, 15, 2, 2), -- Căn hộ view biển, tầng 15, 2 ngủ, 2 khách
(8, 20, 4, 3), -- Penthouse, tầng 20, 4 ngủ, 3 khách
(10, 5, 2, 1); -- Căn hộ dịch vụ, tầng 5, 2 ngủ, 1 khách

INSERT INTO house_details (property_id, has_yard, number_of_floors, total_rooms) VALUES 
(3, 1, 2, 4), -- Nhà nguyên căn, có sân, 2 tầng, tổng 4 phòng
(6, 0, 3, 6), -- Nhà phố kinh doanh, không sân, 3 tầng, tổng 6 phòng
(9, 1, 1, 3); -- Nhà vườn, có sân rộng, 1 tầng, tổng 3 phòng

-- Trước khi chạy lệnh này, hãy xóa các ảnh cũ nếu có hoặc dùng lệnh REPLACE để cập nhật
INSERT INTO property_images (image_url, is_main, property_id) VALUES 
('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000', 1, 1),
('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000', 1, 2),
('https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000', 1, 3),
('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000', 1, 4),
('https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000', 1, 5),
('https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000', 1, 6),
('https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1000', 1, 7),
('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000', 1, 8),
('https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1000', 1, 9),
('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000', 1, 10);

INSERT INTO property_amenities (property_id, amenity_id) VALUES 
(1, 1), (1, 3), -- Phòng 1 có Wifi và Chỗ để xe
(2, 1), (2, 2), (2, 4), -- Căn hộ 2 có Wifi, Thang máy, Điều hòa
(3, 3), (3, 4), -- Nhà 3 có Chỗ để xe, Điều hòa
(4, 1), (4, 4), -- Phòng 4 có Wifi, Điều hòa
(5, 1); -- Căn hộ 5 có Wifi

INSERT INTO favorites (property_id, tenant_id) VALUES 
(1, 2), (2, 2), (3, 2), (5, 2), (8, 2),
(1, 2), (4, 2), (7, 2), (9, 2), (10, 2);

INSERT INTO bookings (viewing_time, status, property_id, tenant_id) VALUES 
(NOW() + INTERVAL 1 DAY, 'PENDING', 1, 2),
(NOW() + INTERVAL 2 DAY, 'APPROVED', 2, 2),
(NOW() + INTERVAL 3 DAY, 'PENDING', 5, 2),
(NOW() + INTERVAL 4 DAY, 'CANCELLED', 3, 2),
(NOW() + INTERVAL 1 DAY, 'PENDING', 4, 1),
(NOW() + INTERVAL 2 DAY, 'APPROVED', 8, 1),
(NOW() + INTERVAL 5 DAY, 'PENDING', 10, 2),
(NOW() + INTERVAL 6 DAY, 'REJECTED', 7, 2),
(NOW() + INTERVAL 7 DAY, 'PENDING', 9, 2),
(NOW() + INTERVAL 8 DAY, 'PENDING', 6, 2);

INSERT INTO rental_requests (created_at, status, property_id, tenant_id) VALUES 
(NOW(), 'PENDING', 1, 2),
(NOW(), 'APPROVED', 2, 2),
(NOW(), 'REJECTED', 5, 2),
(NOW(), 'PENDING', 8, 2),
(NOW(), 'PENDING', 10, 2),
(NOW(), 'PENDING', 4, 2),
(NOW(), 'APPROVED', 3, 2),
(NOW(), 'PENDING', 7, 2),
(NOW(), 'PENDING', 9, 2),
(NOW(), 'PENDING', 6, 2);

INSERT INTO reviews (rating, comment, created_at, property_id, tenant_id) VALUES 
(5, 'Phòng rất sạch sẽ và chủ nhà thân thiện.', NOW(), 1, 2),
(4, 'Vị trí thuận tiện, giá hơi cao một chút.', NOW(), 2, 2),
(5, 'Nhà nguyên căn rất rộng rãi, thoáng mát.', NOW(), 3, 2),
(3, 'Phòng hơi nhỏ so với ảnh nhưng đầy đủ tiện nghi.', NOW(), 4, 2),
(5, 'View biển cực đẹp, đáng đồng tiền bát gạo.', NOW(), 5, 2),
(2, 'Hơi ồn ào do gần đường lớn.', NOW(), 6, 2),
(4, 'An ninh tốt, gần khu công nghiệp.', NOW(), 7, 2),
(5, 'Căn hộ đẳng cấp, nội thất xịn.', NOW(), 8, 2),
(5, 'Không gian xanh tuyệt vời để nghỉ dưỡng.', NOW(), 9, 2),
(4, 'Dịch vụ dọn dẹp rất chuyên nghiệp.', NOW(), 10, 2);

INSERT INTO chat_conversations (started_at, user_id) VALUES 
(NOW(), 2), (NOW(), 2), (NOW(), 2), (NOW(), 2), (NOW(), 2),
(NOW(), 1), (NOW(), 1), (NOW(), 1), (NOW(), 1), (NOW(), 1);

INSERT INTO notifications (content, is_read, created_at, user_id) VALUES 
('Yêu cầu xem phòng của bạn đã được chấp nhận.', 0, NOW(), 2),
('Bạn có tin nhắn mới từ chủ nhà.', 0, NOW(), 2),
('Hợp đồng thuê phòng của bạn sắp hết hạn.', 1, NOW(), 2),
('Hóa đơn tháng 3 đã được khởi tạo.', 0, NOW(), 2),
('Đánh giá của bạn đã được đăng tải thành công.', 1, NOW(), 2),
('Chào mừng bạn đến với SmartRent!', 1, NOW(), 1),
('Yêu cầu thuê phòng của bạn bị từ chối.', 0, NOW(), 1),
('Hệ thống sẽ bảo trì vào 12h đêm nay.', 0, NOW(), 1),
('Bạn có một lượt yêu thích mới cho bài đăng.', 0, NOW(), 1),
('Xác thực tài khoản thành công.', 1, NOW(), 1);

INSERT INTO rental_contracts (id, start_date, end_date, monthly_rent, deposit, status, tenant_id, property_id) VALUES 
(1, '2026-01-01', '2027-01-01', 2500000, 2500000, 'active', 2, 1),
(2, '2026-02-01', '2027-02-01', 5000000, 5000000, 'active', 2, 2),
(3, '2025-12-01', '2026-12-01', 10000000, 10000000, 'active', 2, 3),
(4, '2026-01-15', '2027-01-15', 3200000, 3200000, 'active', 2, 4),
(5, '2026-02-15', '2027-02-15', 12000000, 12000000, 'active', 2, 5),
(6, '2025-06-01', '2026-06-01', 15000000, 15000000, 'terminated', 2, 6),
(7, '2026-01-01', '2027-01-01', 1800000, 1800000, 'active', 2, 7),
(8, '2026-02-01', '2027-02-01', 50000000, 50000000, 'active', 2, 8),
(9, '2025-11-01', '2026-11-01', 7000000, 7000000, 'active', 2, 9),
(10, '2026-02-01', '2027-02-01', 9000000, 9000000, 'active', 2, 10);

INSERT INTO invoices (id, due_date, rental_fee, service_fee, total_amount, status, contract_id) VALUES 
(1, '2026-03-05', 2500000, 50000, 2550000, 'unpaid', 1),
(2, '2026-03-05', 5000000, 100000, 5100000, 'paid', 2),
(3, '2026-03-05', 10000000, 200000, 10200000, 'paid', 3),
(4, '2026-02-05', 3200000, 50000, 3250000, 'overdue', 4),
(5, '2026-03-15', 12000000, 300000, 12300000, 'unpaid', 5),
(6, '2026-01-05', 15000000, 500000, 15500000, 'paid', 6),
(7, '2026-03-05', 1800000, 30000, 18300000, 'unpaid', 7),
(8, '2026-03-05', 50000000, 1000000, 51000000, 'paid', 8),
(9, '2026-02-05', 7000000, 150000, 7150000, 'paid', 9),
(10, '2026-03-05', 9000000, 200000, 9200000, 'unpaid', 10);

INSERT INTO payments (id, amount, method, paid_at, invoice_id) VALUES 
(1, 5100000, 'vnpay', NOW(), 2),
(2, 10200000, 'bank_transfer', NOW(), 3),
(3, 15500000, 'cash', '2026-01-04 10:00:00', 6),
(4, 51000000, 'bank_transfer', NOW(), 8),
(5, 7150000, 'momo', '2026-02-04 15:30:00', 9),
(6, 2550000, 'vnpay', NOW(), 1), 
(7, 3250000, 'bank_transfer', '2026-02-06 09:00:00', 4),
(8, 5100000, 'vnpay', NOW(), 2),
(9, 10200000, 'momo', NOW(), 3),
(10, 12300000, 'vnpay', NOW(), 5);

INSERT INTO chat_messages (id, message, sender, sent_at, conversation_id) VALUES 
(1, 'Chào anh, phòng ở Pasteur còn trống không ạ?', 'tenant', NOW() - INTERVAL 2 HOUR, 1),
(2, 'Chào bạn, phòng đó vẫn còn trống nhé.', 'owner', NOW() - INTERVAL 115 MINUTE, 1),
(3, 'Dạ cho em hỏi giờ giấc ở đó có tự do không anh?', 'tenant', NOW() - INTERVAL 110 MINUTE, 1),
(4, 'Giờ giấc tự do, bạn có chìa khóa cổng riêng nên đi về lúc nào cũng được.', 'owner', NOW() - INTERVAL 105 MINUTE, 1),
(5, 'Vâng, vậy chiều mai em qua xem phòng lúc 5h được không ạ?', 'tenant', NOW() - INTERVAL 100 MINUTE, 1),
(6, 'Được nhé, lúc tới bạn cứ gọi số điện thoại của mình.', 'owner', NOW() - INTERVAL 95 MINUTE, 1),
(7, 'Dạ em cảm ơn anh, hẹn gặp anh ngày mai.', 'tenant', NOW() - INTERVAL 90 MINUTE, 1),
(8, 'Chào bạn, mình thấy bạn vừa đặt lịch xem căn hộ Penthouse.', 'owner', NOW() - INTERVAL 1 HOUR, 2),
(9, 'Dạ đúng rồi ạ, em muốn xem căn hộ vào cuối tuần này.', 'tenant', NOW() - INTERVAL 50 MINUTE, 2),
(10, 'Ok bạn, mình đã duyệt yêu cầu của bạn trên hệ thống rồi nhé.', 'owner', NOW() - INTERVAL 45 MINUTE, 2);