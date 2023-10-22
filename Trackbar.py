import cv2
import numpy as np

def nothing():
    pass

cap = cv2.VideoCapture(0)

# The winmdow of which the trackbar is to be made
cv2.namedWindow("frame")

cv2.createTrackbar("test", "frame",50,500, nothing)
cv2.createTrackbar("color", "frame", 0, 1, nothing)

while True:
    _, frame = cap.read()

    test =cv2.getTrackbarPos("test", "frame")
    s = cv2.getTrackbarPos("color", "frame")
    cv2.putText(frame, str(test), (50,150), cv2.FONT_HERSHEY_COMPLEX, 4, (255,255,255), 2)
    if s == 0:
        pass
    else:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    cv2.imshow("frame", frame)
    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
